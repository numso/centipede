var NUM_PIECES = 12;

var shrooms = require('./shrooms')
  , scorpio = require('./scorpion');

var peed = [];

function init() {
  peed.length = 0;

  for (var i = 0; i < NUM_PIECES; ++i) {
    peed.push({
      isHead:    (i === 0),
      goingLeft: true,
      x:         300 + i * 16,
      y:         0,
      width:     16,
      height:    20,
      dx:        -.1,
      dy:        0,
      next:      0,
      state:     0,
      animTime:  0
    });
  }
}

function update(dTime) {
  for (var i = 0; i < peed.length; ++i) {
    peed[i].animTime += dTime;
    if (peed[i].animTime >= 50) {
      peed[i].animTime = 0;
      peed[i].state = (peed[i].state + 1) % 3;
    }

    if (peed[i].dy !== 0) { // moving down
      peed[i].y += peed[i].dy * dTime;

      if (peed[i].y === peed[i].next) {
        peed[i].y = peed[i].next;
        peed[i].dy = 0;
      }

    } else { // moving over
      peed[i].x += peed[i].dx * dTime;

      if (peed[i].x < 0) {
        peed[i].x = 0;
        hitWall(i);
      }

      if (peed[i].x > 500 - peed[i].width) {
        peed[i].x = 500 - peed[i].width;
        hitWall(i);
      }

      var tileX = Math.floor(peed[i].x / 20);
      var tileY = Math.floor(peed[i].y / 20);
      if (!peed[i].goingLeft) tileX += 1;

      if (shrooms.existsAt(tileX, tileY)) {
        hitWall(i);

        if (shrooms.existsPoisonAt(tileX, tileY)) {
          peed[i].next = 680;
        }
      }
    }
  }
}

function hitWall(i) {
  peed[i].goingLeft = !peed[i].goingLeft;
  peed[i].dx *= -1;

  if (peed[i].y === 680) {
    peed[i].dy = -.1;
    peed[i].next = 560;
  } else {
    peed[i].dy = .1;
    peed[i].next += 20;
  }
}

function render(ctx, g) {
  for (var i = 0; i < peed.length; ++i)
    g.drawPeed(ctx, peed[i].isHead, peed[i].goingLeft, peed[i].x, peed[i].y, peed[i].state);
}

exports.init = init;
exports.update = update;
exports.render = render;
exports.getPeed = function () {
  return peed;
};

exports.killPiece = function (ind) {

  if (ind < peed.length - 1)
    peed[ind + 1].isHead = true;
  peed.splice(ind, 1);

  if (peed.length === 0) {
    init();
    scorpio.init();
  }
};

