var menu     = require('./menu')
  , game     = require('./game')
  , scores   = require('./scores')
  , settings = require('./settings')
  , credits  = require('./credits')
  , shared   = require('../shared')
  , sounds   = require('../sounds')
  ;

function init() {
  bindHandlers();
}

function bindHandlers() {
  $('#game').click(function () {
    sounds.playEffect();
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
    shared.setState(menu);
  });
}

exports.str  = 'slide-menu';
exports.init = init;
