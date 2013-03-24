var shrooms = require('./shrooms');

var spider;

function init(attract) {
  spider = {
    time:       0,
    deathTimer: 0,
    visible:    true,
    width:      40,
    height:     40,
    hungry:     0,
    x:          100,
    y:          350,
    dx:         .2,
    dy:         .2,
    maxY:       700 - 40
  };

  if (attract) spider.maxY -= 50;
}

function update(dTime) {
  spider.x += spider.dx * dTime;
  spider.y += spider.dy * dTime;
  spider.time += dTime;
  spider.hungry += dTime;

  if (spider.x < 0) {
    spider.x = 0;
    spider.dx *= -1;
  }

  if (spider.x > 500 - spider.width) {
    spider.x = 500 - spider.width;
    spider.dx *= -1;
  }

  if (spider.y > spider.maxY) {
    spider.y = spider.maxY;
    spider.dy *= -1;
  }

  if (spider.y < 300) {
    spider.y = 300;
    spider.dy *= -1;
  }

  if (spider.time >= 2000) {
    spider.time = 0;
    spider.dx = (Math.random() * .4) - .2;
    spider.dy = (Math.random() * .4) - .2;
  }

  if (!spider.visible) {
    spider.deathTimer += dTime;
    if (spider.deathTimer >= 10000) {
      spider.visible = true;
      spider.deathTimer = 0;
      spider.y = 350;
      spider.x = Math.floor(Math.random() * (500 - spider.width));
    }
  }

  if (spider.visible && spider.hungry >= 5000) {
    var tileX = Math.floor(spider.x / 20) + 1;
    var tileY = Math.floor(spider.y / 20) + 1;
    if (shrooms.existsAt(tileX, tileY)) {
      shrooms.eatAt(tileX, tileY);
      spider.hungry = 0;
    }
  }
}

function render(ctx, g) {
  if (spider.visible)
    g.drawSpider(ctx, spider.x, spider.y);
}

function pos() {
  return {x: spider.x, y: spider.y, width: spider.width, height: spider.height};
}

function hide() {
  spider.visible = false;
}

function visible() {
  return spider.visible;
}

exports.init    = init;
exports.update  = update;
exports.render  = render;
exports.pos     = pos;
exports.hide    = hide;
exports.visible = visible;
