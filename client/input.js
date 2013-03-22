// take out the setInterval to kill autofire

var keys = {};
var fired = false;

var t;

$(document).keydown(function (e){
  if(e.keyCode == 32 && !keys[32]) {
    t = setInterval(function () {
      fired = false;
    }, 100);
  }
  keys[e.keyCode] = true;
});

$(document).keyup(function (e){
  keys[e.keyCode] = false;
  if(e.keyCode == 32) {
    clearInterval(t);
    fired = false;
  }
});

exports.left = function () { return keys[37]; };
exports.right = function() { return keys[39]; };
exports.up = function() { return keys[38]; };
exports.down = function() { return keys[40]; };

exports.fire = function() {
  var retVal = !fired && keys[32];
  fired = keys[32];
  return retVal;
};
