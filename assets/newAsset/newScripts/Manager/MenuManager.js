const Emitter = require('EventEmitter');
const Key = require("Key");

//define value below
const data = require('SettingController')
cc.Class({
    extends: cc.Component,

    properties: {
        mButton:[cc.Button],
        mainMenu:cc.Node,
        settingPopup:cc.Node,
        mMenuMusic:{
            type:cc.AudioClip,
            default:null
        },
        mClickSound:{
            type:cc.AudioClip,
            default:null,
        }
    },

    start(){
        Emitter.instance.emit(Key.PLAY_MUSIC, this.mMenuMusic);
    },

    onStartGame(){
        Emitter.instance.emit(Key.PLAY_SFX, this.mClickSound);
        cc.director.loadScene('Game', ()=>{
            cc.log(data);
            Emitter.instance.emit(Key.SEND_DATA, data);
        });
    },

    onSetting(){
        Emitter.instance.emit(Key.PLAY_SFX, this.mClickSound);
        Emitter.instance.emit(Key.POPUP_SHOW, this.settingPopup);
        this.mButton.forEach(element => {
            element.interactable = false;
        });
    },

    onBackMenu(){
        Emitter.instance.emit(Key.PLAY_SFX, this.mClickSound);
        Emitter.instance.emit(Key.POPUP_HIDE, this.settingPopup);
        this.mButton.forEach(element => {
            element.interactable = true;
        });
    }
});
