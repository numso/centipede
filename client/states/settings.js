var render = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(render('settings'));
  shared.bindBackButton();
};

exports.start = start;
