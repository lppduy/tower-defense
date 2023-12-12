const LevelMap = require('LevelMap');

cc.Class({
  extends: cc.Component,

  properties: {
    levelMap: {
      default: null,
      type: LevelMap,
    },
  },

  start() {
    this.targets = this.levelMap.tiledMap.getObjectGroup('path').getObjects();
    this.targetIndex = 1;
    const position = this.getCurrentTargetPosition();
    cc.log(position);
    this.node.setPosition(position);
  },

  getCurrentTarget() {
    return this.targets.find(target => parseInt(target.name) === this.targetIndex);
  },

  getCurrentTargetPosition() {
    const currentTarget = this.getCurrentTarget();

    if (!currentTarget) {
      return false;
    }

    const tileCoordinates = this.levelMap.getTileCoordinatesByPosition(
      cc.v2(currentTarget.x, currentTarget.y),
    );
    const position = this.levelMap.roadsLayer.getPositionAt(tileCoordinates.x, tileCoordinates.y);

    return cc.v2(
      position.x + this.levelMap.tileWidth / 2,
      position.y + this.levelMap.tileWidth / 2,
    );
  },
});
