const MainEmitter = require('MainEmitter');
const { UI_EVENTS } = require('EventCode');
const waveData = require('WaveData');

cc.Class({
  extends: cc.Component,

  properties: {
    waves: {
      default: [],
      type: [waveData],
    },
  },

  init(level) {
    this.waveIndex = 0;
    this.level = level;
    this.items = [];
    this.createWave();
  },

  createWave() {
    const wave = this.waves[this.waveIndex];
    if (!wave) {
      return;
    }
    MainEmitter.instance.emit(UI_EVENTS.CREATE_WAVE);
    ++this.waveIndex;

    this.schedule(
      () => {
        MainEmitter.instance.emit(UI_EVENTS.UPDATE_WAVE_COUNT, this.waveIndex);
        this.createEnemy(wave.enemy);
      },
      wave.repeatInterval,
      wave.enemiesCount - 1,
      wave.timeout
    );
  },

  createEnemy(enemyPrefab) {
    const enemyNode = cc.instantiate(enemyPrefab);
    this.node.addChild(enemyNode);
    const enemyComponent = enemyNode.getComponent('Enemy');
    enemyComponent.init(this.level);
    this.items.push(enemyComponent);

    enemyNode.once(
      'killed',
      () => {
        this.onEnemyRemoved('enemy-killed', enemyComponent);
      },
      this
    );

    enemyNode.once(
      'finished',
      () => {
        this.onEnemyRemoved('enemy-finished', enemyComponent);
      },
      this
    );
  },

  onEnemyRemoved(eventName, enemyComponent) {
    this.node.emit(eventName, enemyComponent);
    this.items = this.items.filter(item => item !== enemyComponent);
    if (!this.items.length) {
      this.createWave();
    }
  },
});
