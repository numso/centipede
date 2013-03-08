var render = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {

  var loaded = !!shared.scores.length;

  $('.gameScreen').html(render('scores', { loaded: loaded, hsScores: shared.scores }));
  shared.bindBackButton();
};

exports.start = start;
