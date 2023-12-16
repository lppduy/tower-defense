cc.Class({
  extends: cc.Component,

  properties: {
    speed: 20,
    damage: 25,
  },
  init(targetPosition) {
    this.targetPosition = targetPosition;
    this.damage = 25;
    this.setVelocity();
  },

  update(dt) {
    this.node.x += this.velocity.x;
    this.node.y += this.velocity.y;
  },
  setVelocity() {
    const azimuth = (this.node.angle - 180) * (Math.PI / 180) - Math.PI / 2;
    this.velocity = cc.v2(Math.cos(azimuth) * this.speed, Math.sin(azimuth) * this.speed);
  },
  onCollisionEnter(other, self) {
    if (other.node.name === 'enemy') {
      this.node.destroy()
      other.node.getComponent('Enemy').takeDamage(this.damage)
    }
  },
});
