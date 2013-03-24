var keys = {};
var canFire = true;

$(document).keydown(function (e){
  keys[e.keyCode] = true;
});

$(document).keyup(function (e){
  keys[e.keyCode] = false;
});

exports.left  = function () { return keys[37]; };
exports.right = function () { return keys[39]; };
exports.up    = function () { return keys[38]; };
exports.down  = function () { return keys[40]; };

exports.fire = function () {
  if (keys[32] && canFire) {
    setTimeout(function () { canFire = true; }, 400);
    canFire = false;
    return true;
  }
  return false;
};
