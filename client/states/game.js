var jadify = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(jadify('game'));
  shared.bindBackButton();
};

exports.start = start;
