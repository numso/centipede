var render = require('./requires/render')
  , menu   = require('./states/menu')
  ;

var state = { stop: nop };

function bindBackButton(){
  $('.back').click(function(){
    setState(menu);
  });
};

function getState() {
  return state;
};

function setState(newState) {
  state.stop();
  state = newState;
  state.start();
};

function nop() {};
exports.bindBackButton = bindBackButton;
exports.getState       = getState;
exports.setState       = setState;
exports.nop            = nop;
exports.scores         = undefined;
