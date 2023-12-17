cc.Class({
  extends: cc.Component,

  properties: {
    damage: 0,
    attackSpeed: 1,
    attackRange: 0,
    rotationSpeed: 2000,
    price: 25,
    bulletPrefab: cc.Prefab,
    bulletPosition: cc.Node,
  },
  onLoad() {
    cc.director.getCollisionManager().enabledDebugDraw = true;
    this.timer = 0;
    this.attackInterval = 1 / this.attackSpeed;
    this.currentEnemy = null;
  },
  update(dt) {
    if (!this.currentEnemy) return;
    this.timer += dt;
    if (this.timer >= this.attackInterval) {
      this.shoot();
      this.timer = 0;
    }
  },
  init(coordinates) {
    this.coordinates = coordinates;
    this.targets = [];
  },
  onCollisionEnter(other, self) {
    if (other.node.name === 'enemy') {
      this.targets.push(other.node);
      this.currentEnemy = this.getTarget();
    }
  },
  onCollisionStay(other, self) {
    if (other.node.name === 'enemy') {
      this.lookAtEnemy(this.currentEnemy);
    }
  },
  onCollisionExit(other, self) {
    this.removeTarget(other.node);
    this.currentEnemy = this.getTarget();
  },
  removeTarget(node) {
    this.targets = this.targets.filter(target => target !== node);
  },
  getTarget() {
    return this.targets[0];
  },

  shoot() {
    if (!this.currentEnemy) return;
    const bulletNode = cc.instantiate(this.bulletPrefab);
    const bulletPositionRelativeToTowers = this.node.convertToWorldSpaceAR(
      this.bulletPosition.position
    );
    const bulletPositionInTowers = this.node.parent.convertToNodeSpaceAR(
      bulletPositionRelativeToTowers
    );

    bulletNode.position = cc.v2(bulletPositionInTowers.x, bulletPositionInTowers.y);
    bulletNode.angle = this.node.angle;
    this.node.parent.addChild(bulletNode);
    bulletNode.getComponent('Bullet').setVelocity();
  },

  lookAtEnemy(targetNode) {
    const targetPosition = cc.v2(targetNode.x, targetNode.y);
    const towerPosition = cc.v2(this.node.x, this.node.y);
    const direction = targetPosition.sub(towerPosition);
    const radianAngle = Math.atan2(direction.y, direction.x);
    const angle = cc.misc.radiansToDegrees(radianAngle) - 90;
    this.node.angle = angle;
  },
});
