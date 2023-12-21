const MainEmitter = require('MainEmitter');
const { UI_EVENTS } = require('EventCode');

cc.Class({
  extends: cc.Component,

  properties: {
    coinAmountLabel: cc.Label,
    waveAmountLabel: cc.Label,
    waveTimeoutLabel: cc.Label,

    winPanel:cc.Node,
    losePanel:cc.Node,
  },

  onLoad() {
    this.coins = null;
    this.coinAmountLabel.string = this.coins;
    this.timer = 10;
    this.waveAmountLabel.string = `Wave 0`;
    MainEmitter.instance.registerEvent(UI_EVENTS.CREATE_WAVE, this.onCreateWave.bind(this));
    MainEmitter.instance.registerEvent(
      UI_EVENTS.UPDATE_WAVE_COUNT,
      this.onUpdateWaveCount.bind(this)
    );
    MainEmitter.instance.registerEvent(
      UI_EVENTS.UPDATE_COINS_AMOUNT,
      this.onUpdateCoinsAmount.bind(this)
    );

    this.showWaveTimeout();
  },

  onCreateWave() {
    this.showWaveTimeout();
  },

  onUpdateWaveCount(amount) {
    this.waveAmountLabel.string = `Wave ${amount}`;
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

  onUpdateCoinsAmount(amount) {
    this.coins = amount;
    this.coinAmountLabel.string = this.coins;
  },

  completeGame(){
    this.winPanel.active = true;
  },

  gameOver(){
    this.losePanel.active = true;
  }
});
