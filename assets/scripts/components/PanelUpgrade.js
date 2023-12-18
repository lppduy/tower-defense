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
    this.upgradeBtn.on('touchend', this.onUpgradeTower, this);
    this.sellBtn.on('touchend', this.onSellTower, this);
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
 
  onUpgradeTower() {
    
  },
  onSellTower(tower) {
    tower;
  },
});
