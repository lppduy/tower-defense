cc.Class({
  extends: cc.Component,

  properties: {
    speed: 20,
    damage: 0,
    explosionSound: {
      default: null,
      type: cc.AudioClip,
    },
  },
  onLoad() {
    this.isRocketCollided = false;
  },
  update(dt) {
    if (this.isRocketCollided) return;
    this.node.x += this.velocity.x;
    this.node.y += this.velocity.y;
  },
  configBullet(bulletData) {
    this.damage = bulletData.damage;
    this.getComponent(cc.Sprite).spriteFrame = bulletData.spriteFrame;
    this.node.width = bulletData.size.width;
    this.node.height = bulletData.size.height;
  },

  onCollisionEnter(other, self) {
    if (other.node.group !== "enemy") return;

    if (self.node.group === "bullet") {
      this.handleBulletCollision(other);
    }
    if (self.node.group === "rocket" && self.tag === 1) {
      this.handleRocketCollision();
    }
    if (self.node.group === "rocket" && self.tag === 2) {
      this.handleRocketExplosion(other);
    }
  },

  setVelocity() {
    const azimuth = (this.node.angle - 180) * (Math.PI / 180) - Math.PI / 2;
    this.velocity = cc.v2(
      Math.cos(azimuth) * this.speed,
      Math.sin(azimuth) * this.speed
    );
  },

  handleBulletCollision(other) {
    this.node.destroy();
    other.node.getComponent("Enemy").takeDamage(this.damage);
  },

  handleRocketCollision() {
    this.isRocketCollided = true;
    this.node.getComponent(cc.BoxCollider).enabled = false;
    this.playExplosionAnimation();
    this.scheduleOnce(() => {
      this.node.getComponent(cc.CircleCollider).enabled = true;
    }, 0);
  },

  handleRocketExplosion(other) {
    other.node.getComponent("Enemy").takeDamage(this.damage);
  },

  destroyBullet() {
    this.node.destroy();
  },

  playExplosionAnimation() {
    this.node.scale = 0.5;
    const rocketAnim = this.node.getComponent(cc.Animation);
    rocketAnim.on("play", this.playExplosionSound, this);
    rocketAnim.on("finished", this.destroyBullet, this);
    rocketAnim.play(rocketAnim.defaultClip.name);
  },

  playExplosionSound() {
    const audioId = cc.audioEngine.playEffect(this.explosionSound, false);
    this.scheduleOnce(() => {
      cc.audioEngine.stopEffect(audioId);
    }, 0.5);
  },
});
