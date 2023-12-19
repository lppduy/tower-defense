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
    this.tower = null;
    this.upgradeBtn.on('touchend', this.onUpgradeTower, this);
    this.sellBtn.on('touchend', this.onSellTower, this);
  },

  show(coordinates, tower) {
    this.tower = tower;
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
    this.hide();
    console.log('Upgrade', this.tower);
  },
  onSellTower() {
    console.log('Sell', this.tower);
    
    this.hide();
  },
});
