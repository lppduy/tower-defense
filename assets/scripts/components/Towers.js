const MainEmitter = require('MainEmitter');
const { GAME_EVENTS } = require('EventCode');

cc.Class({
  extends: cc.Component,

  properties: {
    towerPrefabs: [cc.Prefab],
  },
  onLoad() {
    this.curTowerNode = null;
    MainEmitter.instance.registerEvent(
      GAME_EVENTS.INSTANTIATE_TOWER,
      this.onInstantiateTower.bind(this)
    );
    MainEmitter.instance.registerEvent(GAME_EVENTS.CREATE_TOWER, this.onCreateTower.bind(this));
  },
  init(map) {
    this.map = map;
    this.items = [];
  },
  onInstantiateTower({ towerKey, towerCoordinates }) {
    const towerNode = cc.instantiate(
      this.towerPrefabs.find(towerPrefab => towerPrefab.name === towerKey)
    );
    const towerComponent = towerNode.getComponent('Tower');

    towerComponent.init(towerCoordinates);
    const position = this.map.towersLayer.getPositionAt(towerCoordinates);
    towerNode.setPosition(
      cc.v2(position.x + this.map.tileWidth / 2, position.y + this.map.tileHeight / 2)
    );
    this.curTowerNode = towerNode;
    MainEmitter.instance.emit(GAME_EVENTS.REQUEST_BUY_TOWER, towerComponent.price);
  },
  onCreateTower() {
    const towerComponent = this.curTowerNode.getComponent('Tower');
    this.items.push(towerComponent);
    this.node.addChild(this.curTowerNode);
  },
  getByCoordinates(coordinates) {
    return this.items.find(
      towerComponent =>
        towerComponent.coordinates.x === coordinates.x &&
        towerComponent.coordinates.y === coordinates.y
    );
  },
});
