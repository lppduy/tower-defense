const MainEmitter = require('MainEmitter');
const { GAME_EVENTS, UI_EVENTS } = require('EventCode');

const Emitter = require('EventEmitter');
const Key = require('Key');
cc.Class({
  extends: cc.Component,

  properties: {
    upgradePanel: cc.Node,
    sellPanel: cc.Node,
  },
  onLoad() {
    MainEmitter.instance.registerEvent(
      UI_EVENTS.UPDATE_COINS_AMOUNT,
      this.onUpdateCoinsAmount.bind(this)
    );
  },
  init(map) {
    this.map = map;
    this.coordinates = {
      x: 0,
      y: 0,
    };
    this.towerComponent = null;
    this.upgradePanel.on('touchend', this.onUpgradeTower, this);
    this.sellPanel.on('touchend', this.onSellTower, this);
  },

  show(coordinates, towerComponent, playerCoins) {
    this.towerComponent = towerComponent;
    this.coordinates = coordinates;
    const position = this.map.towersLayer.getPositionAt(this.coordinates);
    this.node.setPosition(
      cc.v2(position.x + this.map.tileWidth / 2, position.y + this.map.tileHeight / 2)
    );
    this.updateUpgradePanelUI(towerComponent, playerCoins);
    this.setCoinLabel(this.sellPanel, Math.trunc(towerComponent.price / 2));
    this.node.active = true;
  },
  hide() {
    this.node.active = false;
  },

  onUpgradeTower() {
    MainEmitter.instance.emit(GAME_EVENTS.REQUEST_UPGRADE_TOWER, this.towerComponent);
    this.hide();
  },
  onSellTower() {
    Emitter.instance.emit(Key.SELL_TURRET_SOUND);
    const coinsAmount = Math.trunc(this.towerComponent.price / 2);
    MainEmitter.instance.emit(GAME_EVENTS.SELL_TOWER, coinsAmount);
    MainEmitter.instance.emit(GAME_EVENTS.DESTROY_TOWER, this.towerComponent);
    this.hide();
  },
  setCoinLabel(panelNode, coinAmount) {
    const coinLabel = panelNode.getChildByName('Coin Amount').getComponent(cc.Label);
    coinLabel.string = coinAmount;
  },
  updateUpgradePanelUI(towerComponent, playerCoins) {
    const buttonNode = this.upgradePanel.getComponent(cc.Button);
    if (towerComponent.level === towerComponent.maxLevel) {
      buttonNode.interactable = false;
      this.setCoinLabel(this.upgradePanel, 'Max');
    } else {
      buttonNode.interactable = playerCoins >= towerComponent.upgradePrice;
      this.setCoinLabel(this.upgradePanel, towerComponent.upgradePrice);
    }
  },
  onUpdateCoinsAmount(amount) {
    this.updateUpgradePanelUI(this.towerComponent, amount);
  },
});
