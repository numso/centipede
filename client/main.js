window.require = require;

var jadify = require('./requires/render')
  , shared = require('./shared')
  , g = require('./graphics')
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

  // initialize the graphics object
  g.init();

  // get the high scores from the server
  getScores();

  // bind all the buttons
  bindHandlers();

  // initialize all the states
  initStates();

  // set the current state
  shared.setState(states.menu);

  // set up the context
  var canvas = document.getElementById('myGame');
  ctx = canvas.getContext('2d');

  // set up the time
  lastTime = Date.now();

  // start the game loop
  requestAnimationFrame(gameLoop);
}

function getScores() {
  $.get('/getHighScores', function (data) {
    shared.scores = JSON.parse(data);

    var scores = jadify('components/scores-table', { hsScores: shared.scores });
    $('.scoresWrapper .all-scores').html(scores);
  });
}

function initStates() {
  for (var state in states) {
    states[state].init   = states[state].init   || shared.nop;
    states[state].start  = states[state].start  || shared.nop;
    states[state].stop   = states[state].stop   || shared.nop;
    states[state].render = states[state].render || shared.nop;
    states[state].update = states[state].update || shared.nop;

    states[state].init();
  }
}

function bindHandlers() {
  $('#game').click(function () {
    shared.setState(states.game);
  });

  $('#scores').click(function () {
    shared.setState(states.scores);
  });

  $('#credits').click(function () {
    shared.setState(states.credits);
  });

  $('#settings').click(function () {
    shared.setState(states.settings);
  });

  $('#exit').click(function () {
    window.open('', '_self', '');
    window.close();
  });

  $('.back').click(function () {
    shared.setState(states.menu);
  });
}

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
}

init();
