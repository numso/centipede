var jadify = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(jadify('credits'));
  shared.bindBackButton();
};

exports.start = start;
