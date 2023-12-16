const LevelMap = require('LevelMap');
const PanelCreate = require('PanelCreate');
const Towers = require('Towers');
const EnemyWaves = require('EnemyWaves');
cc.Class({
  extends: cc.Component,

  properties: {
    map: {
      default: null,
      type: LevelMap,
    },
    panelCreate: {
      default: null,
      type: PanelCreate,
    },
    towers: {
      default: null,
      type: Towers,
    },
    enemyWaves: {
      default: null,
      type: EnemyWaves,
    },
  },

  onLoad() {
    this.init();
    this.setEvents();
  },

  start() {},
  init() {
    const collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;
    this.map.init();
    this.panelCreate.init(this.map);
    this.towers.init(this.map);
    this.enemyWaves.init(this);
  },
  setEvents() {
    this.map.node.on('touchend', this.onMapTouch, this);
    this.panelCreate.node.on('tower-create', this.onTowerCreate, this);
  },
  onTowerCreate({ towerKey, towerCoordinates }) {
    this.towers.create(towerKey, towerCoordinates);
    this.panelCreate.hide();
  },
  onMapTouch(e) {
    this.panelCreate.hide();
    const location = e.getLocation();
    const position = {
      x: location.x * 2,
      y: location.y * 2,
    };
    const coordinates = this.map.getTileCoordinatesByPosition(position);
    const tileID = this.map.towersLayer.getTileGIDAt(coordinates);
    if (tileID) {
      const tower = this.towers.getByCoordinates(coordinates);
      if (!tower) {
        this.panelCreate.show(coordinates);
      }
    }
  },
});
