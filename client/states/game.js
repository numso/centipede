var render = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(render('game'));
  shared.bindBackButton();
};

exports.start = start;
