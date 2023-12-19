const MainEmitter = require('MainEmitter');
const { GAME_EVENTS } = require('EventCode');

cc.Class({
  extends: cc.Component,

  properties: {
    healthBar: cc.ProgressBar,
    maxHealth:50,
    curHealth:0,
  },

  onLoad() {
    this.curHealth = this.maxHealth;
    MainEmitter.instance.registerEvent(GAME_EVENTS.HIT_BASE, this.onHitBase.bind(this));
  },
  onHitBase(damage) {
    this.curHealth -= damage;
    this.healthBar.progress = this.curHealth / this.maxHealth;
    if (this.curHealth <= 0) {
      MainEmitter.instance.emit(GAME_EVENTS.END_GAME);
      this.node.getChildByName('Sprite').color = cc.Color.GRAY;
    }
  },
});
