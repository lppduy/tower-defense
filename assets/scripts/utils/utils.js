function blink(node) {
  const blinkAction = cc
    .sequence(cc.tintTo(0.1, 255, 0, 0), cc.tintTo(0.1, 255, 255, 255))
    .repeat(2);

  node.runAction(blinkAction);
}
module.exports = { blink };
