cc.Class({
  extends: cc.Component,

  properties: {
    speed: 20,
    damage: 25,
    shootingSound: {
      default: null,
      type: cc.AudioClip,
    },
  },

  update(dt) {
    this.node.x += this.velocity.x;
    this.node.y += this.velocity.y;
  },
  setVelocity() {
    const azimuth = (this.node.angle - 180) * (Math.PI / 180) - Math.PI / 2;
    this.velocity = cc.v2(Math.cos(azimuth) * this.speed, Math.sin(azimuth) * this.speed);
    cc.audioEngine.playEffect(this.shootingSound, false);
  },
  onCollisionEnter(other, self) {
    if (other.node.group === 'enemy') {
      this.node.destroy();
      other.node.getComponent('Enemy').takeDamage(this.damage);
    }
  },
});
