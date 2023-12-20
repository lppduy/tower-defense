const MainEmitter = require('MainEmitter');
const { UI_EVENTS } = require('EventCode');
const waveData = require('WaveData');

cc.Class({
  extends: cc.Component,

  properties: {
    wave: {
      default: null,
      type: waveData,
    },
  },

  init(level) {
    this.waveIndex = 0;
    this.enemyCount = 0;
    this.isBoss = false;
    this.bossCreated = 0;
    this.level = level;
    this.items = [];
    this.createWave();
  },

  createWave() {
    const wave = this.wave;

    MainEmitter.instance.emit(UI_EVENTS.CREATE_WAVE);
    ++this.waveIndex;
    let enemyIndex = 0;

    if (this.waveIndex === 1) {
      this.enemiesCount = 5;
    } else if (this.waveIndex === 2) {
      this.enemiesCount = 10;
    } else this.enemiesCount++;

    this.schedule(
      () => {
        MainEmitter.instance.emit(UI_EVENTS.UPDATE_WAVE_COUNT, this.waveIndex);
        this.createEnemy(wave.enemies, this.waveIndex, enemyIndex);
        enemyIndex++;
      },
      wave.repeatInterval,
      this.enemiesCount - 1,
      wave.timeout,
    );
  },

  createEnemy(enemies, waveIndex, enemyIndex) {
    const lastEnemyIndex = this.enemiesCount - 1;

    if (
      (waveIndex === 5 && enemyIndex === lastEnemyIndex) ||
      (waveIndex === 10 && enemyIndex === lastEnemyIndex)
    ) {
      this.isBoss = true;
      this.bossCreated++;
    } else this.isBoss = false;

    const enemyPrefab =
      enemies[!this.isBoss ? Math.floor(Math.random() * (enemies.length - 1)) : 2];
    const enemyNode = cc.instantiate(enemyPrefab);

    this.node.addChild(enemyNode);
    const enemyComponent = enemyNode.getComponent('Enemy');

    if (this.isBoss) {
      if (waveIndex === 5) {
        enemyComponent.health = 1500;
        enemyComponent.coins = 500;
      }
      if (waveIndex === 10) {
        enemyComponent.health = 3000;
        enemyComponent.coins = 1000;
      }
    } else {
      enemyComponent.health = enemyComponent.health * waveIndex;
      enemyComponent.coins = enemyComponent.coins * waveIndex;
    }

    enemyComponent.init(this.level);
    this.items.push(enemyComponent);

    enemyNode.once(
      'killed',
      () => {
        this.onEnemyRemoved('enemy-killed', enemyComponent);
      },
      this,
    );

    enemyNode.once(
      'finished',
      () => {
        this.onEnemyRemoved('enemy-finished', enemyComponent);
      },
      this,
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
