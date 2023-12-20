const Emitter = require('EventEmitter');
const Key = require("Key");

cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad(){
        Emitter.instance.registerEvent(Key.POPUP_SHOW, this.popupShow.bind(this));
        Emitter.instance.registerEvent(Key.POPUP_HIDE, this.popupHide.bind(this));
    },
    popupShow(node){
        node.active = true;
    },
    popupHide(node){
        node.active = false;
    },
});
