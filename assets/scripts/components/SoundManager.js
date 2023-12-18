const MainEmitter = require('MainEmitter');
const { SOUND_EVENTS } = require('EventCode');

cc.Class({
  extends: cc.Component,

  properties: {
    tower1Sound: {
      default: null,
      type: cc.AudioClip,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    MainEmitter.instance.registerEvent(
      SOUND_EVENTS.TOWER_SHOOT,
      this.playTowerShootSound.bind(this)
    );
  },

  start() {},
  playTowerShootSound() {
    cc.audioEngine.playEffect(this.tower1Sound, false);
  },
  // update (dt) {},
});
