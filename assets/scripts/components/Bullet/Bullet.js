cc.Class({
  extends: cc.Component,

  properties: {
    speed: 20,
    damage: 0,
  },
  update(dt) {
    this.node.x += this.velocity.x;
    this.node.y += this.velocity.y;
  },
  configBullet(bulletData) {
    this.damage = bulletData.damage;
    this.getComponent(cc.Sprite).spriteFrame = bulletData.spriteFrame;
    this.node.width = bulletData.size.width;
    this.node.height = bulletData.size.height;
  },
  setVelocity() {
    const azimuth = (this.node.angle - 180) * (Math.PI / 180) - Math.PI / 2;
    this.velocity = cc.v2(Math.cos(azimuth) * this.speed, Math.sin(azimuth) * this.speed);
  },
  onCollisionEnter(other, self) {
    if (other.node.group === 'enemy') {
      this.node.destroy();
      other.node.getComponent('Enemy').takeDamage(this.damage);
      console.log(this.damage);
    }
  },
});
