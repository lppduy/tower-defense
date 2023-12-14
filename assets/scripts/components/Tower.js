cc.Class({
  extends: cc.Component,

  properties: {
    damage: 0,
    attackSpeed: 1,
    attackRange: 0,
    rotationSpeed: 500,
    price: 25,
  },

  init(coordinates) {
    this.coordinates = coordinates;
    this.targets = [];
    this.schedule(() => {
      this.tryFire();
    }, 0.5);
  },
  onCollisionEnter(other, self) {
    if (other.node.name === 'enemy') {
      this.targets.push(other.node);
      console.log(other);
    }
  },
  onCollisionExit(other, self) {
    this.removeTarget(other.node);
  },
  removeTarget(node) {
    this.targets.filter(target => target !== node);
  },
  getTarget() {
    return this.targets.length ? this.targets.find(target => target.active) : false;
  },
  tryFire() {
    const targetNode = this.getTarget();
    if (targetNode && targetNode.active) {
      const targetPosition = cc.v2(targetNode.x, targetNode.y);
      this.rotateTo(targetPosition);
    }
  },
  rotateTo(targetPosition) {
    const angle = this.getAngle(targetPosition);
    let distance = Math.abs(angle - this.node.angle);

    if (distance) {
      const time = distance / this.rotationSpeed;
      this.node.runAction(cc.rotateTo(time, angle));
    }
  },
  getAngle(targetPosition) {
    const result =
      Math.atan2(targetPosition.y - this.node.y, targetPosition.x - this.node.x) * 180 / Math.PI - 90;
    return result;
  },
});
