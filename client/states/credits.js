var render = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(render('credits'));
  shared.bindBackButton();
};

exports.start = start;
