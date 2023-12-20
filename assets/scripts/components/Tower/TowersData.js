const TOWER_1_DATA = [
  {
    type: 'Tower1',
    level: 1,
    damage: 25,
    reloadTime: 1,
    price: 60,
    upgradePrice: 100,
    attackRange: 0,
    bulletSpriteFrameIndex: 0,
    bulletSize: {
      width: 20,
      height: 20,
    },
  },
  {
    type: 'Tower1',
    level: 2,
    damage: 50,
    reloadTime: 1,
    price: 100,
    upgradePrice: 200,
    attackRange: 0,
    bulletSpriteFrameIndex: 1,
    bulletSize: {
      width: 30,
      height: 30,
    },
  },
  {
    type: 'Tower1',
    level: 3,
    damage: 50,
    reloadTime: 1,
    price: 200,
    upgradePrice: 400,
    attackRange: 0,
    bulletSpriteFrameIndex: 2,
    bulletSize: {
      width: 30,
      height: 30,
    },
  },
  {
    type: 'Tower1',
    level: 4,
    damage: 100,
    reloadTime: 1,
    price: 400,
    upgradePrice: 800,
    attackRange: 0,
    bulletSpriteFrameIndex: 3,
    bulletSize: {
      width: 30,
      height: 30,
    },
  },
  {
    type: 'Tower1',
    level: 5,
    damage: 100,
    reloadTime: 1,
    price: 800,
    upgradePrice: null,
    attackRange: 0,
    bulletSpriteFrameIndex: 4,
    bulletSize: {
      width: 30,
      height: 38,
    },
  },
];
const TOWER_2_DATA = [
  {
    type: 'Tower2',
    level: 1,
    damage: 20,
    reloadTime: 2,
    price: 60,
    upgradePrice: 100,
    attackRange: 1,
    bulletSpriteFrameIndex: 0,
    bulletSize: {
      width: 20,
      height: 40,
    },
  },
  {
    type: 'Tower2',
    level: 2,
    damage: 40,
    reloadTime: 2,
    price: 100,
    upgradePrice: 200,
    attackRange: 1,
    bulletSpriteFrameIndex: 1,
    bulletSize: {
      width: 20,
      height: 40,
    },
  },
  {
    type: 'Tower2',
    level: 3,
    damage: 40,
    reloadTime: 2,
    price: 200,
    upgradePrice: 400,
    attackRange: 1,
    bulletSpriteFrameIndex: 2,
    bulletSize: {
      width: 20,
      height: 40,
    },
  },
  {
    type: 'Tower2',
    level: 4,
    damage: 80,
    reloadTime: 2,
    price: 400,
    upgradePrice: 800,
    attackRange: 1,
    bulletSpriteFrameIndex: 3,
    bulletSize: {
      width: 20,
      height: 40,
    },
  },
  {
    type: 'Tower2',
    level: 5,
    damage: 80,
    reloadTime: 2,
    price: 800,
    upgradePrice: null,
    attackRange: 1,
    bulletSpriteFrameIndex: 4,
    bulletSize: {
      width: 25,
      height: 55,
    },
  },
];

module.exports = { TOWER_1_DATA, TOWER_2_DATA };