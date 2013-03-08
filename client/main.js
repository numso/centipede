window.require = require;

var render = require('./requires/render')
  , shared = require('./shared')
  ;

// Load all the states
var states = {
  menu:     require('./states/menu'),
  game:     require('./states/game'),
  scores:   require('./states/scores'),
  credits:  require('./states/credits'),
  settings: require('./states/settings')
};

function init() {
  window.requestAnimationFrame = window.requestAnimationFrame; // FIX THIS
  initStates();

  // set the current state
  shared.setState(states.menu);

  requestAnimationFrame(gameLoop);
};

function initStates() {
  for (var state in states) {
    states[state].init   = states[state].init   || shared.nop;
    states[state].start  = states[state].start  || shared.nop;
    states[state].stop   = states[state].stop   || shared.nop;
    states[state].render = states[state].render || shared.nop;
    states[state].update = states[state].update || shared.nop;

    states[state].init();
  }
};

function gameLoop() {
  requestAnimationFrame(gameLoop);

  // MANAGE THE TIMES
  shared.getState().update();

  // GRAB THE CONTEXT
  shared.getState().render();
};

init();
