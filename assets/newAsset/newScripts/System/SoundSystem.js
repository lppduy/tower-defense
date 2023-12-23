const Emitter = require('EventEmitter');
const Key = require('Key');

cc.Class({
  extends: cc.Component,
  properties: {
    mMusicSound: cc.AudioSource,
    mSfxSound: cc.AudioSource,
  },

  onLoad() {
    Emitter.instance.registerEvent(Key.PLAY_MUSIC, this.playMusic.bind(this));
    Emitter.instance.registerEvent(Key.PLAY_SFX, this.playSfx.bind(this));
    Emitter.instance.registerEvent(Key.CHANGE_SFX_VOLUME, this.changeSfxVolume.bind(this));
    Emitter.instance.registerEvent(Key.CHANGE_MUSIC_VOLUME, this.changeMusicVolume.bind(this));
  },

  //add music
  playMusic(clip) {
    this.mMusicSound.clip = clip;
    this.mMusicSound.play();
  },

  //add sfx
  playSfx(clip) {
    this.mSfxSound.clip = clip;
    cc.audioEngine.playEffect(this.mSfxSound.clip, false);
  },

  changeSfxVolume(volume) {
    this.mSfxSound.volume = volume;
  },
  changeMusicVolume(volume) {
    this.mMusicSound.volume = volume;
  },
});
