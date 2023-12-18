const GAME_EVENTS = {
  ENEMY_KILLED: 'enemy-killed',
  HIT_BASE: 'hit-base',
  END_GAME: 'end-game',
};
const UI_EVENTS = {
  CREATE_WAVE: 'create-wave',
  UPDATE_WAVE_COUNT: 'update-wave-count',
  BUY_TOWER: 'buy-tower'
};
module.exports = { GAME_EVENTS, UI_EVENTS };
