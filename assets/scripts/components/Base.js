const MainEmitter = require('MainEmitter');
const { GAME_EVENTS } = require('EventCode');
const Emitter = require('EventEmitter');
const Key = require('Key');
cc.Class({
  extends: cc.Component,

  properties: {
    healthBar: cc.ProgressBar,
    maxHealth: 50,
    curHealth: 0,
    explosionSound: {
      default: null,
      type: cc.AudioClip,
    },
  },

  onLoad() {
    this.curHealth = this.maxHealth;
    MainEmitter.instance.registerEvent(GAME_EVENTS.HIT_BASE, this.onHitBase.bind(this));
  },
  
  onHitBase(damage) {
    this.curHealth -= damage;
    this.healthBar.progress = this.curHealth / this.maxHealth;
    if (this.curHealth <= 0) {
      Emitter.instance.emit(Key.LOSE_GAME);
      Emitter.instance.emit(Key.PLAY_SFX, this.explosionSound);
      this.node.getChildByName('Base Explosion').active = true;
      this.healthBar.active = false;
      MainEmitter.instance.emit(GAME_EVENTS.END_GAME);
      this.node.getChildByName('Sprite').color = cc.Color.GRAY;
    }
  },
});
