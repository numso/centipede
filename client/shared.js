var state = { stop: nop };

function getState() {
  return state;
}

function setState(newState) {
  state.stop();
  state = newState;
  impress().goto(newState.str);
  state.start();
}

function nop() {}

exports.getState       = getState;
exports.setState       = setState;
exports.nop            = nop;
exports.scores         = [];
exports.user           = {};
