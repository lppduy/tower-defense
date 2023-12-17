const MainEmitter = require('MainEmitter');
const { UI_EVENTS } = require('EventCode');

cc.Class({
  extends: cc.Component,

  properties: {
    towerPrefabs: [cc.Prefab],
  },

  init(map) {
    this.map = map;
    this.items = [];
  },
  create(key, coordinates) {
    const towerNode = cc.instantiate(
      this.towerPrefabs.find(towerPrefab => towerPrefab.name === key)
    );
    const towerComponent = towerNode.getComponent('Tower');
    towerComponent.init(coordinates);
    this.items.push(towerComponent);
    const position = this.map.towersLayer.getPositionAt(coordinates);
    towerNode.setPosition(
      cc.v2(position.x + this.map.tileWidth / 2, position.y + this.map.tileHeight / 2)
    );
    this.node.addChild(towerNode);
    MainEmitter.instance.emit(UI_EVENTS.BUY_TOWER, towerComponent.price)
  },
  getByCoordinates(coordinates) {
    return this.items.find(
      towerComponent =>
        towerComponent.coordinates.x === coordinates.x &&
        towerComponent.coordinates.y === coordinates.y
    );
  },
});
