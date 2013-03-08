var render = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(render('scores', { hsScores: shared.scores }));
  shared.bindBackButton();
};

exports.start = start;
