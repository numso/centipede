window.require = require;

var jadify = require('./requires/render')
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

var lastTime, ctx;

function init() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) { window.setTimeout(cb, 1000 / 60); };

  // get the high scores from the server
  getScores();

  // initialize all the states
  initStates();

  // set the current state
  shared.setState(states.menu);

  // set up the context
  var canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  // set up the time
  lastTime = Date.now();

  // start the game loop
  requestAnimationFrame(gameLoop);
};

function getScores() {
  $.get('/getHighScores', function (data) {
    shared.scores = JSON.parse(data);

    // if, bychance, the scores page was shown before scores were loaded, show them now
    var scores = jadify('components/scores-table', { hsScores: shared.scores });
    $('.scoresWrapper .allScores').html(scores);
  });
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
  // request to be called again in the next animation loop
  // this needs to be done first to support older browsers
  requestAnimationFrame(gameLoop);

  // get the time difference, but cap it at 20ms
  var curTime = Date.now()
    , dTime   = curTime - lastTime;
  if (dTime > 20) dTime = 20;

  shared.getState().update(dTime);
  shared.getState().render(ctx);
};

init();
