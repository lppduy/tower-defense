const MainEmitter = require('MainEmitter');
const { GAME_EVENTS, UI_EVENTS } = require('EventCode');

cc.Class({
  extends: cc.Component,

  properties: {
    coinAmountLabel: cc.Label,
    waveAmountLabel: cc.Label,
    waveTimeoutLabel: cc.Label,
  },

  onLoad() {
    this.coins = 200;
    this.coinAmountLabel.string = this.coins;
    this.timer = 10;
    MainEmitter.instance.registerEvent(UI_EVENTS.CREATE_WAVE, this.onCreateWave.bind(this));
    MainEmitter.instance.registerEvent(
      UI_EVENTS.UPDATE_WAVE_COUNT,
      this.onUpdateWaveCount.bind(this)
    );
    MainEmitter.instance.registerEvent(UI_EVENTS.BUY_TOWER, this.onBuyTower.bind(this));
    MainEmitter.instance.registerEvent(GAME_EVENTS.ENEMY_KILLED, this.onEnemyKilled.bind(this));
    this.showWaveTimeout();
  },

  start() {},
  onCreateWave() {
    this.showWaveTimeout();
  },
  onUpdateWaveCount(amount) {
    this.waveAmountLabel.string = `Wave ${amount}/5`;
  },
  showWaveTimeout() {
    this.waveTimeoutLabel.string = `Next wave in ${this.timer}s`;
    this.waveTimeoutLabel.node.active = true;
    this.schedule(this.countDown, 1);
  },
  countDown() {
    if (this.timer === 1) {
      this.waveTimeoutLabel.node.active = false;
      this.timer = 10;
      this.unschedule(this.countDown);
      return;
    }
    this.timer--;
    this.waveTimeoutLabel.string = `Next wave in ${this.timer}s`;
  },
  onBuyTower(price) {
    if (this.coins >= price) {
      this.coins -= price;
      this.coinAmountLabel.string = this.coins;
    }
  },
  onEnemyKilled(coins) {
    this.coins += coins;
    this.coinAmountLabel.string = this.coins;
  },
  //   update (dt) {

  //   },
});
