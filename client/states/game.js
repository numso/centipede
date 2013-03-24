var jadify    = require('../requires/render')
  , shared    = require('../shared')
  , g         = require('../graphics')
  , inp       = require('../input')
  , snd       = require('../sounds')
  , collision = require('../collision')
  , centipede = require('../centipede')
  , shrooms   = require('../shrooms')
  , playa     = require('../playa')
  , bullets   = require('../bullets')
  , scorpion  = require('../scorpion')
  , spider    = require('../spider')
  , flea      = require('../flea')
  , menu      = require('./menu')
  ;

var attractMode = false;

function start() {
  snd.playMusic('game');

  playa.init();
  spider.init(attractMode);
  scorpion.init();
  centipede.init();
  shrooms.init();
  flea.init(attractMode);

  if (attractMode)
    bindExitHandlers();
}

function stop() {
  snd.playMusic();

  if (attractMode)
    unbindExitHandlers();
}

function init() {};

function bindExitHandlers() {
  $('body').bind('click.attract', function (e) { shared.setState(menu); });
  $('body').bind('keypress.attract', function (e) { shared.setState(menu); });
  $('body').bind('mousemove.attract', function (e) { shared.setState(menu); });
}

function unbindExitHandlers() {
  $('body').unbind('click.attract');
  $('body').unbind('keypress.attract');
  $('body').unbind('mousemove.attract');
}

function update(dTime){
  if (attractMode)
    playa.attract(dTime);
  else
    playa.update(dTime);
  bullets.update(dTime);
  spider.update(dTime);
  scorpion.update(dTime);
  centipede.update(dTime);
  flea.update(dTime);
}

function render(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 700);
    shrooms.render(ctx, g);
    playa.render(ctx, g);
    bullets.render(ctx, g);
    spider.render(ctx, g);
    scorpion.render(ctx, g);
    centipede.render(ctx, g);
    flea.render(ctx, g);
}

function attract(isOn) {
  attractMode = isOn;
}

exports.start  = start;
exports.stop   = stop;
exports.update = update;
exports.render = render;
exports.init   = init;
exports.str    = 'slide-game';

exports.attract = attract;
