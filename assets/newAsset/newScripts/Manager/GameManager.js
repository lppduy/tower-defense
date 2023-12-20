const StateMachine = require("javascript-state-machine");
const Emitter = require("../Utilities/EventEmitter");
const Key = require("Key");

const STATE = {
  INIT: "init",
  START: "start",
  WAVE_COMPLETE: "wave_complete",
  GAME_OVER: "game_over",
};

cc.Class({
  extends: cc.Component,
  properties: {
    HP: require("Base"),
    mSounds: {
      type: cc.AudioClip,
      default: [],
    },
  },
  onLoad() {
    Emitter.instance.registerEvent(
      Key.SEND_DATA,
      ((data) => {
        cc.log(data);
        Emitter.instance.emit(Key.PLAY_MUSIC, this.mSounds[0]);
      }).bind(this)
    );

    this._onStartGame = this.onStartGame.bind(this);
    this._onCompleteGame = this.onCompleteGame.bind(this);
    this._onGameOver = this.onGameOver.bind(this);

    this.fsm = new StateMachine({
      init: STATE.INIT,
      transitions: [
        { name: "goStart", from: STATE.INIT, to: STATE.START },
        { name: "goComplete", from: STATE.START, to: STATE.WAVE_COMPLETE },
        { name: "goOver", from: STATE.START, to: STATE.GAME_OVER },
      ],
      methods: {
        onGoStart: this._onStartGame,
        onGoComplete: this._onCompleteGame,
        onGoOver: this._onGameOver,
      },
    });
  },

  start() {
    this.schedule(() => {
      if (this.HP.curHealth > 0) {
        cc.log("playing");
      } else {
        cc.log("end Game");
        this.unscheduleAllCallbacks();
      }
    }, 1);
  },

  onStartGame() {
    cc.log("start game");
  },

  onCompleteGame() {
    cc.log("complete wave");
  },

  onGameOver() {
    cc.log("game over");
  },
});
