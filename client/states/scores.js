var shared = require('../shared')
  , jadify = require('../requires/render');

function checkScore(score, cb) {
  $.post('/checkScore', { score: score }, function (data) {
    cb(data);
  });
}

function submitScore(score, name) {
  $.post('/submitScore', { score: score, name: name }, function (data) {
    if (data) {
      jadify('components/score-table', { scores: data });
    }
  });
}

exports.str         = 'slide-scores';
exports.checkScore  = checkScore;
exports.submitScore = submitScore;
