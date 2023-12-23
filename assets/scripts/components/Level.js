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
    this.coins = 60;
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
    MainEmitter.instance.registerEvent(GAME_EVENTS.ENEMY_KILLED, this.updateCoinsAmount.bind(this));
    MainEmitter.instance.registerEvent(GAME_EVENTS.SELL_TOWER, this.updateCoinsAmount.bind(this));
    MainEmitter.instance.registerEvent(
      GAME_EVENTS.REQUEST_UPGRADE_TOWER,
      this.onRequestUpgradeTower.bind(this)
    );
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
      const towerComponent = this.towers.getByCoordinates(coordinates);
      if (!towerComponent) {
        this.panelCreate.show(coordinates);
      } else {
        this.panelUpgrade.show(coordinates, towerComponent, this.coins);
      }
    }
  },
  onRequestBuyTower(price) {
    if (this.coins >= price) {
      MainEmitter.instance.emit(GAME_EVENTS.CREATE_TOWER);
      this.updateCoinsAmount(-price);
    }
    this.panelCreate.hide();
  },
  onRequestUpgradeTower(towerComponent) {
    if (this.coins >= towerComponent.upgradePrice) {
      this.updateCoinsAmount(-towerComponent.upgradePrice);
      towerComponent.upgradeTower();
    }
    this.panelUpgrade.hide();
  },
  updateCoinsAmount(amount) {
    this.coins += amount;
    MainEmitter.instance.emit(UI_EVENTS.UPDATE_COINS_AMOUNT, this.coins);
  },
});
