const MainEmitter = require('MainEmitter');
const { GAME_EVENTS } = require('EventCode');
cc.Class({
  extends: cc.Component,

  properties: {
    upgradeBtn: cc.Node,
    sellBtn: cc.Node,
  },

  init(map) {
    this.map = map;
    this.coordinates = {
      x: 0,
      y: 0,
    };
    this.towerComponent = null;
    this.upgradeBtn.on('touchend', this.onUpgradeTower, this);
    this.sellBtn.on('touchend', this.onSellTower, this);
  },

  show(coordinates, towerComponent) {
    this.towerComponent = towerComponent;
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

  onUpgradeTower() {
    MainEmitter.instance.emit(GAME_EVENTS.REQUEST_UPGRADE_TOWER, this.towerComponent.upgradePrice);
    this.hide();
  },
  onSellTower() {
    const coinsAmount = Math.trunc(this.towerComponent.price / 2);
    MainEmitter.instance.emit(GAME_EVENTS.SELL_TOWER, coinsAmount);
    MainEmitter.instance.emit(GAME_EVENTS.DESTROY_TOWER, this.towerComponent);
    this.hide();
  },
});
