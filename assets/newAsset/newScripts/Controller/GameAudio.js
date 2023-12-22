// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Emitter = require("EventEmitter");
const Key = require("Key");
cc.Class({
  extends: cc.Component,

  properties: {
    turretBuildSound: {
      type: cc.AudioClip,
      default: null,
    },
    upgradeSound: {
      type: cc.AudioClip,
      default: null,
    },
    sellTurretSound: {
      type: cc.AudioClip,
      default: null,
    },
  },

  onLoad() {
    Emitter.instance.registerEvent(
      Key.BUILD_TURRET,
      (() => {
        Emitter.instance.emit(Key.PLAY_SFX, this.turretBuildSound);
      }).bind(this)
    );
    
    Emitter.instance.registerEvent(
      Key.UPGRADE_SOUND,
      (() => {
        Emitter.instance.emit(Key.PLAY_SFX, this.upgradeSound);
      }).bind(this)
    );

    Emitter.instance.registerEvent(
      Key.SELL_SOUND,
      (() => {
        Emitter.instance.emit(Key.PLAY_SFX, this.sellTurretSound);
      }).bind(this)
    );
  },
});
