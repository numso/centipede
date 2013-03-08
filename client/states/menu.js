var jadify = require('../requires/render')
  , shared = require('../shared')
  ;

// Load Game States
var game       = require('./game')
  , scores     = require('./scores')
  , credits    = require('./credits')
  , settings   = require('./settings')
  ;

function start() {
  $('.gameScreen').html(jadify('menu'));
  bindHandlers();
};

function bindHandlers(){
  $('#game').click(function () {
    shared.setState(game);
  });

  $('#scores').click(function () {
    shared.setState(scores);
  });

  $('#credits').click(function () {
    shared.setState(credits);
  });

  $('#settings').click(function () {
    shared.setState(settings);
  });

  $('#exit').click(function(){
    window.open('', '_self', '');
    window.close();
  });
};

exports.start = start;
