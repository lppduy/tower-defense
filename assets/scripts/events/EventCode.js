const GAME_EVENTS = {
  ENEMY_KILLED: 'enemy-killed',
  HIT_BASE: 'hit-base',
  END_GAME: 'end-game',
  INSTANTIATE_TOWER: 'instantiate-tower',
  REQUEST_BUY_TOWER: 'request-buy-tower',
  CREATE_TOWER: 'create-tower',
  SELL_TOWER: 'sell-tower',
};
const UI_EVENTS = {
  CREATE_WAVE: 'create-wave',
  UPDATE_WAVE_COUNT: 'update-wave-count',
  UPDATE_COINS_AMOUNT: 'update-coins-amount',
};
const SOUND_EVENTS = {
  TOWER_SHOOT: 'tower-shoot',
};
module.exports = { GAME_EVENTS, UI_EVENTS, SOUND_EVENTS };
