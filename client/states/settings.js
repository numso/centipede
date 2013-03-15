var shared = require('../shared')
  , sounds = require('../sounds')
  ;

function init() {
  getUser();
  bindHandlers();
}

function getUser() {
  shared.user = JSON.parse($('.user-obj').text());
  $('.user-obj').remove();
}

function bindHandlers() {
  $('.option').click(function () {
    var key = $(this).data('option')
      , val = shared.user[key] = !shared.user[key];
    sounds.playMusic();
    $(this).find('span').text(shared.user[key] ? 'ON' : 'OFF');
    $.post('/updateUser', { key: key, val: val });
  });
}

exports.str  = 'slide-settings';
exports.init = init;
