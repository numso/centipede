var shrooms = [];

var QUANTITY = 40
  , WIDTH    = 25
  , HEIGHT   = 25
  ;

function init() {
  shrooms.length = 0;
  for (var i = 0; i < WIDTH; ++i)
    shrooms.push({});

  for (var i = 0; i < QUANTITY; ++i) {
    var x = Math.floor(Math.random() * WIDTH)
      , y = Math.floor(Math.random() * HEIGHT) + 1
      ;

    if (shrooms[x][y]) {
      --i;
      continue;
    }

    shrooms[x][y] = {
      health: 4,
      poisoned: false,
      x: x,
      y: y
    }
  }
}

function render(ctx, g) {
  for (var i = 0; i < shrooms.length; ++i)
    for (var j in shrooms[i])
      g.drawMushrooms(shrooms[i][j].health, shrooms[i][j].poisoned, ctx, shrooms[i][j].x, shrooms[i][j].y);
}

function destroyAt(x, y) {
  if (x < 0 || x >= WIDTH) return false;
  if (!shrooms[x][y]) return false;
  if (--shrooms[x][y].health === 0) delete shrooms[x][y];
  return true;
}

function existsAt(x, y) {
  if (x < 0 || x >= WIDTH) return false;
  return !!shrooms[x][y];
}

function existsPoisonAt(x, y) {
  return shrooms[x][y].poisoned;
}

function poisonAt(x, y) {
  if (x < 0 || x >= WIDTH) return false;
  if (!shrooms[x][y]) return false;
  shrooms[x][y].poisoned = true;
  return true;
}

function createShroom(x, y) {
  if(!!shrooms[x][y]) return false;
  shrooms[x][y] = {
    health: 4,
    poisoned: false,
    x: x,
    y: y
  }
}

exports.init      = init;
exports.render    = render;
exports.destroyAt = destroyAt;
exports.existsAt  = existsAt;
exports.poisonAt  = poisonAt;
exports.existsPoisonAt = existsPoisonAt;
exports.createShroom   = createShroom;
