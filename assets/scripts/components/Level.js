const LevelMap = require('LevelMap');
const PanelCreate = require('PanelCreate');
cc.Class({
  extends: cc.Component,

  properties: {
    map: {
      default: null,
      type: LevelMap,
    },
    panelCreate: {
      default: null,
      type: PanelCreate,
    },
  },

  onLoad() {
    this.init();
    this.setEvents();
  },

  start() {},
  init() {
    this.map.init();
    this.panelCreate.init(this.map);
  },
  setEvents() {
    this.map.node.on('touchend', this.onMapTouch, this);
    this.panelCreate.node.on('button-click', this.onTowerCreate, this);
  },
  onTowerCreate() {
    console.log('Create');
  },
  onMapTouch(e) {
    this.panelCreate.hide();
    const location = e.getLocation();
    const position = {
      x: location.x * 2,
      y: location.y * 2,
    };
    const coordinates = this.map.getTileCoordinatesByPosition(position);
    const tileID = this.map.towersLayer.getTileGIDAt(coordinates);
    console.log(coordinates);
    if (tileID) {
      console.log(tileID);
      this.panelCreate.show(coordinates);
    }
  },
  // update (dt) {},
});
