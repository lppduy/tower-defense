const StateMachine = require("javascript-state-machine");
const Emitter = require("EventEmitter");
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
    UI: require("UI"),
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

    Emitter.instance.registerOnce(Key.WIN_GAME, this.onCompleteGame.bind(this));
    Emitter.instance.registerOnce(Key.LOSE_GAME, this.onGameOver.bind(this));
  },

  start() {
    this.fsm["goStart"]();
    // this.fsm["goComplete"]();
    // this.fsm["goOver"]();
  },

  onStartGame() {
    cc.log("start game");
  },

  onCompleteGame() {
    this.UI.completeGame();
  },

  onGameOver() {
    this.UI.gameOver();
  },
});
