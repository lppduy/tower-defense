const Emitter = require("EventEmitter");
const Key = require("Key");

const soundConfig = {
  sfxVolume: 0,
  musicVolume: 0,
  mouseSpeed:0,
};
cc.Class({
  extends: cc.Component,
  properties: {
    sfxVolumeSlider: cc.Slider,
    musicVolumeSlider: cc.Slider,
  },

  ChangeSfxVolume() {
    Emitter.instance.emit(Key.CHANGE_SFX_VOLUME, this.sfxVolumeSlider.progress);
    soundConfig.sfxVolume = this.sfxVolumeSlider.progress;
  },
  ChangeMusicVolume() {
    Emitter.instance.emit(
      Key.CHANGE_MUSIC_VOLUME,
      this.musicVolumeSlider.progress
    );
    soundConfig.musicVolume = this.musicVolumeSlider.progress;
  },
});

module.exports = soundConfig;