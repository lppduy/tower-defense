const LevelMap = require('LevelMap');

cc.Class({
  extends: cc.Component,

  properties: {
    velocity: { default: 150, serializable: true },
    levelMap: {
      default: null,
      type: LevelMap,
    },
  },

  start() {
    this.targets = this.levelMap.tiledMap.getObjectGroup('path').getObjects();
    this.targetIndex = 1;

    this.node.setPosition(this.getCurrentTargetPosition());

    this.targetIndex++;
    this.move();
  },

  move() {
    const targetPosition = this.getCurrentTargetPosition();

    if (!targetPosition) {
      this.node.emit('finished');
      this.node.destroy();
    } else {
      this.moveTo(targetPosition).then(() => {
        this.targetIndex++;
        this.move();
      });
    }
  },

  moveTo(targetPosition) {
    return new Promise(resolve => {
      const x = Math.abs(targetPosition.x - this.node.x);
      const y = Math.abs(targetPosition.y - this.node.y);
      const distance = Math.max(x, y);

      const time = distance / this.velocity;
      const moveToAction = cc.moveTo(time, targetPosition);
      const sequence = cc.sequence(moveToAction, cc.callFunc(resolve));
      this.node.runAction(sequence);
    });
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
