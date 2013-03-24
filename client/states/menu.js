var menu     = require('./menu')
  , game     = require('./game')
  , scores   = require('./scores')
  , settings = require('./settings')
  , credits  = require('./credits')
  , shared   = require('../shared')
  , sounds   = require('../sounds')
  ;

var attractTimer = 0;

function init() {
  bindHandlers();
  bindAttractHandlers();
}

function start() {
  attractTimer = 0;
}

function update(dTime) {
  attractTimer += dTime;

  if (attractTimer >= 15000) {
    game.attract(true);
    shared.setState(game);
  }
}

function bindAttractHandlers() {
  $('body').bind('click.attractIn', function (e) { attractTimer = 0; });
  $('body').bind('keypress.attractIn', function (e) { attractTimer = 0; });
  $('body').bind('mousemove.attractIn', function (e) { attractTimer = 0; });
}

function bindHandlers() {
  $('#game').click(function () {
    sounds.playEffect();
    game.attract(false);
    shared.setState(game);
  });

  $('#scores').click(function () {
    sounds.playEffect();
    shared.setState(scores);
  });

  $('#settings').click(function () {
    sounds.playEffect();
    shared.setState(settings);
  });

  $('#credits').click(function () {
    sounds.playEffect();
    shared.setState(credits);
  });

  $('#exit').click(function () {
    sounds.playEffect();
    window.open('', '_self', '');
    window.close();
  });

  $('.back').click(function () {
    sounds.playEffect();
    settings.unbindDialog();
    shared.setState(menu);
  });
}

exports.str  = 'slide-menu';
exports.init = init;
exports.start = start;
exports.update = update;

