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

    /* TRY TO SEE HOW IT WORKS:
    const coords = this.getTileCoordinatesByPosition(cc.v2(100, 100));
    cc.log(coords);
    */
  },
  show(coordinates) {},
});
