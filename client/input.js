var shared = require('./shared');

var keys = {};
var canFire = true;

$(document).keydown(function (e){
  keys[e.keyCode] = true;
});

$(document).keyup(function (e){
  keys[e.keyCode] = false;
});

exports.left  = function () { return keys[shared.user.controls.left]; };
exports.right = function () { return keys[shared.user.controls.right]; };
exports.up    = function () { return keys[shared.user.controls.up]; };
exports.down  = function () { return keys[shared.user.controls.down]; };

exports.fire = function () {
  if (keys[shared.user.controls.fire] && canFire) {
    setTimeout(function () { canFire = true; }, 400);
    canFire = false;
    return true;
  }
  return false;
};

exports.resetKeys = function () {
  for (var key in keys) {
    keys[key] = false;
  }
}
