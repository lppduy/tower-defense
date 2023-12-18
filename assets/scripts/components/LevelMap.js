cc.Class({
  extends: cc.Component,

  properties: {},

  init() {
    this.tiledMap = this.getComponent(cc.TiledMap);

    this.roadsLayer = this.tiledMap.getLayer('roads');
    this.towersLayer = this.tiledMap.getLayer('towers');

    this.tiledSize = this.tiledMap.getTileSize();
    this.tileWidth = this.tiledSize.width;
    this.tileHeight = this.tiledSize.height;

    this.mapSize = this.tiledMap.getMapSize();
    this.mapWidth = this.mapSize.width;
    this.mapHeight = this.mapSize.height;

  },

  // Convert Cocos's coordinates (x,y) to Tiledmap's coordinates (col, row)
  getTileCoordinatesByPosition(position) {
    return {
      x: Math.floor(position.x / this.tileWidth),
      y: this.mapHeight - Math.floor(position.y / this.tileHeight) - 1,
    };
  },
});
