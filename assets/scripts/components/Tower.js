cc.Class({
  extends: cc.Component,

  properties: {
    damage: 0,
    attackSpeed: 1,
    attackRange: 0,
    rotationSpeed: 2000,
    price: 25,
    bulletPrefab: cc.Prefab,
  },
  onLoad() {
    cc.director.getCollisionManager().enabledDebugDraw = true;
  },
  init(coordinates) {
    this.coordinates = coordinates;
    this.targets = [];
    this.schedule(() => {
      this.tryFire();
    }, 1 / this.attackSpeed);
  },
  onCollisionEnter(other, self) {
    if (other.node.name === 'enemy') {
      this.targets.push(other.node);
    }
  },
  onCollisionExit(other, self) {
    this.removeTarget(other.node);
  },
  removeTarget(node) {
    this.targets = this.targets.filter(target => target !== node);
  },
  getTarget() {
    return this.targets.length ? this.targets.find(target => target.active) : false;
  },
  tryFire() {
    const targetNode = this.getTarget();
    if (targetNode && targetNode.active) {
      const targetPosition = cc.v2(targetNode.x, targetNode.y);
      this.rotateTo(targetPosition).then(() => {
        this.createBullet(targetPosition);
    });
    }
  },
  createBullet(targetPosition) {
    const bulletNode = cc.instantiate(this.bulletPrefab);
    bulletNode.position = cc.v2(this.node.x, this.node.y);
    bulletNode.angle = this.node.angle;
    this.node.parent.addChild(bulletNode);
    bulletNode.getComponent('Bullet').init(targetPosition)
  },
  rotateTo(targetPosition) {
    const angle = this.getAngle(targetPosition);
    const distance = Math.abs(angle - this.node.angle);

    return new Promise(resolve => {
      if (distance) {
          const time = distance / this.rotationSpeed;
          this.node.runAction(cc.sequence(
              cc.rotateTo(time, -angle),
              cc.callFunc(resolve)
          ));
      } else {
          resolve();
      }
  });
  },
  getAngle(targetPosition) {
    const result =
      (Math.atan2(targetPosition.y - this.node.y, targetPosition.x - this.node.x) * 180) / Math.PI -
      90;
    return result;
  },
});
