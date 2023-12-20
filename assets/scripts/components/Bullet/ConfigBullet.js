cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    console.log(this.damage);
  },

  start() {},
  configBullet(bulletData) {
    this.damage = bulletData.damage;
    console.log(this.damage);
  },
  // update (dt) {},
});
