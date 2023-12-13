const EventEmitter = require('events');
class mainEmitter {
  constructor() {
    this._emiter = new EventEmitter();
    this._emiter.setMaxListeners(100);
  }
  getInstance() {
    if (!mainEmitter.instance) {
      mainEmitter.instance = new mainEmitter();
    }
    return mainEmitter.instance;
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
    mainEmitter.instance = null;
  }
}
mainEmitter.instance = null;
module.exports = mainEmitter;
