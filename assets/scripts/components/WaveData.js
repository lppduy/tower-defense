cc.Class({
  extends: cc.Component,

  properties: {
    enemy: {
      default: null,
      type: cc.Prefab,
    },
    enemiesCount: 0,
    timeout: {default: 10, serializable: true},
    repeatInterval: 1,
  },
});
