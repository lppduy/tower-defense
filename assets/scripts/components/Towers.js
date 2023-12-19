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
    MainEmitter.instance.registerEvent(GAME_EVENTS.DESTROY_TOWER, this.onDestroyTower.bind(this));
  },
  init(map) {
    this.map = map;
    this.towerComponents = [];
  },
  onInstantiateTower({ towerKey, towerCoordinates }) {
    const towerNode = cc.instantiate(
      this.towerPrefabs.find(towerPrefab => towerPrefab.name === towerKey)
    );
    const towerComponent = towerNode.getComponent('Tower');

    towerComponent.init(towerCoordinates, towerKey);
    const position = this.map.towersLayer.getPositionAt(towerCoordinates);
    towerNode.setPosition(
      cc.v2(position.x + this.map.tileWidth / 2, position.y + this.map.tileHeight / 2)
    );
    this.curTowerNode = towerNode;
    MainEmitter.instance.emit(GAME_EVENTS.REQUEST_BUY_TOWER, towerComponent.price);
  },
  onCreateTower() {
    const towerComponent = this.curTowerNode.getComponent('Tower');
    this.towerComponents.push(towerComponent);
    this.node.addChild(this.curTowerNode);
  },
  onDestroyTower(towerComponent) {
    this.removeTowerComponent(towerComponent);
  },
  getByCoordinates(coordinates) {
    return this.towerComponents.find(
      towerComponent =>
        towerComponent.coordinates.x === coordinates.x &&
        towerComponent.coordinates.y === coordinates.y
    );
  },
  removeTowerComponent(tower) {
    this.towerComponents = this.towerComponents.filter(
      towerComponent =>
        towerComponent.coordinates.x !== tower.coordinates.x &&
        towerComponent.coordinates.y !== tower.coordinates.y
    );
    tower.node.destroy();
  },
});
