const MainEmitter = require('MainEmitter');
const { GAME_EVENTS, UI_EVENTS } = require('EventCode');
const LevelMap = require('LevelMap');
const PanelCreate = require('PanelCreate');
const Towers = require('Towers');
const PanelUpgrade = require('PanelUpgrade');
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
    panelUpgrade: {
      default: null,
      type: PanelUpgrade,
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
    this.coins = 500;
    this.init();
    this.setEvents();
  },

  start() {
    MainEmitter.instance.emit(UI_EVENTS.UPDATE_COINS_AMOUNT, this.coins);
  },
  init() {
    const collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;
    this.map.init();
    this.panelCreate.init(this.map);
    this.panelUpgrade.init(this.map);
    this.towers.init(this.map);
    this.enemyWaves.init(this);
  },
  setEvents() {
    this.map.node.on('touchend', this.onMapTouch, this);
    MainEmitter.instance.registerEvent(
      GAME_EVENTS.REQUEST_BUY_TOWER,
      this.onRequestBuyTower.bind(this)
    );
    MainEmitter.instance.registerEvent(GAME_EVENTS.ENEMY_KILLED, this.onEnemyKilled.bind(this));
  },

  onMapTouch(e) {
    this.panelCreate.hide();
    this.panelUpgrade.hide();
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
      } else {
        this.panelUpgrade.show(coordinates, tower);
      }
    }
  },
  onRequestBuyTower(price) {
    if (this.coins >= price) {
      this.coins -= price;
      MainEmitter.instance.emit(GAME_EVENTS.CREATE_TOWER);
      MainEmitter.instance.emit(UI_EVENTS.UPDATE_COINS_AMOUNT, this.coins);
    } else {
      console.log('Not enough coins to buy tower!');
    }
    this.panelCreate.hide();
  },
  onEnemyKilled(coins) {
    this.coins += coins;
    MainEmitter.instance.emit(UI_EVENTS.UPDATE_COINS_AMOUNT, this.coins);
  },
});
