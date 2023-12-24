const MainEmitter = require('MainEmitter');
const { GAME_EVENTS } = require('EventCode');
const Emitter = require('EventEmitter');
const Key = require('Key');
const { blink } = require('utils');

cc.Class({
  extends: cc.Component,

  properties: {
    healthBar: cc.ProgressBar,
    maxHealth: 10,
    curHealth: 0,
    explosionSound: {
      default: null,
      type: cc.AudioClip,
    },
    mainSprite: cc.Node,
  },

  onLoad() {
    this.curHealth = this.maxHealth;
    this.isDestroyed = false;
    MainEmitter.instance.registerEvent(GAME_EVENTS.HIT_BASE, this.onHitBase.bind(this));
  },

  onHitBase(damage) {
    blink(this.mainSprite);
    this.curHealth -= damage;
    this.healthBar.progress = this.curHealth / this.maxHealth;
    if (this.curHealth <= 0 && !this.isDestroyed) {
      this.isDestroyed = true;
      Emitter.instance.emit(Key.LOSE_GAME);
      Emitter.instance.emit(Key.PLAY_SFX, this.explosionSound);
      this.node.getChildByName('Base Explosion').active = true;
      this.healthBar.active = false;
      this.node.getChildByName('Sprite').color = cc.Color.GRAY;
      MainEmitter.instance.emit(GAME_EVENTS.END_GAME);
    }
  },
});
