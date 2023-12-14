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
    // create correct node
    const towerNode = cc.instantiate(
      this.towerPrefabs.find(towerPrefab => towerPrefab.name === key)
    );
    // init tower component
    const towerComponent = towerNode.getComponent('Tower');
    towerComponent.init(coordinates)
    // store tower component in this.items
    this.items.push(towerComponent)
    // place created node in correct postion based on the coordinates
    const position = this.map.towersLayer.getPositionAt(coordinates)
    towerNode.setPosition(cc.v2(position.x + this.map.tileWidth / 2, position.y + this.map.tileHeight / 2))
    this.node.addChild(towerNode)
  },
});
