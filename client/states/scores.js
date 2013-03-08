var render = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(render('scores', { hsScores: scores }));
  shared.bindBackButton();
};

exports.start = start;
