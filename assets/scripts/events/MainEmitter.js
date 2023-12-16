const EventEmitter = require('events');
class MainEmitter {
  constructor() {
    this._emiter = new EventEmitter();
    this._emiter.setMaxListeners(100);
  }
  getInstance() {

    if (!MainEmitter.instance) {
      MainEmitter.instance = new MainEmitter();
    }
    return MainEmitter.instance;


  }
  emit(...args) {
    this._emiter.emit(...args);
  }
  registerEvent(event, listener) {
    this._emiter.on(event, listener);
  }
  registerOnce(event, listener) {
    this._emiter.once(event, listener);
  }
  removeEvent(event, listener) {
    this._emiter.removeListener(event, listener);
  }
  destroy() {
    this._emiter.removeAllListeners();
    this._emiter = null;

    MainEmitter.instance = null;
  }
}
MainEmitter.instance = new MainEmitter();
module.exports = MainEmitter;

