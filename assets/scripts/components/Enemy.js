const MainEmitter = require('MainEmitter');
const { GAME_EVENTS } = require('EventCode');

const { blink } = require('utils');
cc.Class({
  extends: cc.Component,

  properties: {
    velocity: { default: 150, serializable: true },
    health: 50,
    damage: { default: 10, serializable: true },
    coins: { default: 10, serializable: true },
    _rotationSpeed: 300,
    mainSprite: cc.Node,
  },

  init(level) {
    this.levelMap = level.map;
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
      this.rotateTo(targetPosition);
      this.moveTo(targetPosition).then(() => {
        this.targetIndex++;
        this.move();
      });
    }
  },

  getAngle(targetPosition) {
    const result =
      (Math.atan2(targetPosition.y - this.node.y, targetPosition.x - this.node.x) * -180) / Math.PI;
    return result;
  },

  rotateTo(targetPosition) {
    const angle = this.getAngle(targetPosition);
    let distance = Math.abs(angle - this.node.angle);

    if (distance) {
      const time = distance / this._rotationSpeed;
      this.node.runAction(cc.rotateTo(time, angle));
    }
  },

  moveTo(targetPosition) {
    const x = Math.abs(targetPosition.x - this.node.x);
    const y = Math.abs(targetPosition.y - this.node.y);
    const distance = Math.max(x, y);
    const time = distance / this.velocity;

    return new Promise(resolve => {
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
      cc.v2(currentTarget.x, currentTarget.y)
    );
    const position = this.levelMap.roadsLayer.getPositionAt(tileCoordinates.x, tileCoordinates.y);

    return cc.v2(
      position.x + this.levelMap.tileWidth / 2,
      position.y + this.levelMap.tileWidth / 2
    );
  },
  takeDamage(damage) {
    blink(this.mainSprite);
    this.health -= damage;
    if (this.health <= 0) {
      this.node.stopAllActions();
      this.node.emit('killed');
      MainEmitter.instance.emit(GAME_EVENTS.ENEMY_KILLED, this.coins);
      this.node.destroy();
    }
  },
  onCollisionEnter(other, self) {
    if (other.node.group === 'base') {
      MainEmitter.instance.emit(GAME_EVENTS.HIT_BASE, this.damage);
      self.node.emit('finished');
      self.node.destroy();
    }
  },
});
