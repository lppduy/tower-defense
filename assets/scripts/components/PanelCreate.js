const MainEmitter = require('MainEmitter');
const { GAME_EVENTS } = require('EventCode');

const Emitter = require("EventEmitter");
const Key = require("Key");
cc.Class({
  extends: cc.Component,

  properties: {
    panel1: cc.Node,
    panel2: cc.Node,
  },

  init(map) {
    this.map = map;
    this.coordinates = {
      x: 0,
      y: 0,
    };
    this.panel1.on('touchend', this.onPanelClick, this);
    this.panel2.on('touchend', this.onPanelClick, this);
  },

  show(coordinates) {
    this.coordinates = coordinates;
    const position = this.map.towersLayer.getPositionAt(this.coordinates);
    this.node.setPosition(
      cc.v2(position.x + this.map.tileWidth / 2, position.y + this.map.tileHeight / 2)
    );
    this.node.active = true;
  },
  hide() {
    this.node.active = false;
  },
  
  onPanelClick(e) {
    MainEmitter.instance.emit(GAME_EVENTS.INSTANTIATE_TOWER, {
      towerKey: e.target.name,
      towerCoordinates: this.coordinates,
    })
    Emitter.instance.emit(Key.BUILD_TURRET);
  },
});
