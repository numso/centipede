window.require = require;

var socket = io.connect();

var jadify = require('./requires/render')
  , shared = require('./shared')
  , g      = require('./graphics')
  , sounds = require('./sounds')
  ;

// Load all the states
var states = {
  menu:     require('./states/menu'),
  game:     require('./states/game'),
  scores:   require('./states/scores'),
  settings: require('./states/settings'),
  credits:  require('./states/credits')
};

var lastTime, ctx;

socket.emit('newGame', {}, function (data) {
  states.settings.createQR(data);
});

socket.on('playerConnected', function (data) {
  shared.netPlayers[data.player] = {
    x: 0,
    y: 0,
    width: 30,
    height: 50,
    dx: 0,
    dy: 0,
    fire: false,
    fireCount: 400,
    dead: true
  };
});

socket.on('playerDisconnected', function (data) {
  delete shared.netPlayers[data.player];
});

socket.on('pressedButton', function (data) {
  if (shared.netPlayers[data.player].dead) return;
  if (data.val === 'shoot') {
    shared.netPlayers[data.player].fire = true;
  } else if (data.val === 'stop') {
    shared.netPlayers[data.player].dx = 0;
    shared.netPlayers[data.player].dy = 0;
  } else {
    shared.netPlayers[data.player].dx = -data.x;
    shared.netPlayers[data.player].dy = -data.y;
  }
});

function init() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (cb) { window.setTimeout(cb, 1000 / 60); };

  // initialize the graphics and sound object
  g.init();
  sounds.init();

  // initialize all the states
  initStates();

  // set the current state
  shared.setState(states.menu);

  // set up the context
  var canvas = document.getElementById('myGame');
  ctx = canvas.getContext('2d');

  sounds.playMusic();

  // set up the time
  lastTime = Date.now();

  // start the game loop
  requestAnimationFrame(gameLoop);
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

function gameLoop() {
  // request to be called again in the next animation loop
  // this needs to be done first to support older browsers
  requestAnimationFrame(gameLoop);

  // B.N. THIS MAKES THE GAME LAG FOR SOME REASON...
  // get the time difference, but cap it at 20ms
  // var curTime = Date.now()
  //   , dTime   = curTime - lastTime;
  // lastTime = curTime;
  // if (dTime > 20) dTime = 20;
  var dTime = 20;
  shared.getState().update(dTime);
  shared.getState().render(ctx);
}

init();
