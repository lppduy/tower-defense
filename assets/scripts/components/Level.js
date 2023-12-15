const LevelMap = require('LevelMap');

cc.Class({
  extends: cc.Component,

  properties: {
    map: {
      default: null,
      type: LevelMap,
    },
  },

  onLoad() {
    this.initMap();
    this.setEvents();
  },
  initMap() {
    this.map.init();
  },
  setEvents() {
    this.map.node.on(cc.Node.EventType.TOUCH_END, this.onMapTouch, this);
  },
  onMapTouch(e) {
    const location = e.getLocation();
    const position = {
      x: location.x * 2,
      y: location.y * 2,
    };
    const coordinates = this.map.getTileCoordinatesByPosition(position);
    const tileId = this.map.towersLayer.getTileGIDAt(coordinates);

    if (tileId) {
      console.log('tileId: ', tileId);
    }
  },
});
