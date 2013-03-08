var render = require('../requires/render')
  , shared = require('../shared')
  ;

function start() {
  $('.gameScreen').html(render('scores', {names: ["Justin", "Dallin", "Tarah"]}));
  shared.bindBackButton();
};

exports.start = start;
