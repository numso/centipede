var jadify = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(jadify('settings'));
  shared.bindBackButton();
};

exports.start = start;
