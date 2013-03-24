var shrooms = ('./shrooms');
var flea;

function init(attract) {
    flea = {
        dir: "right",
        visible: true,
        deathTimer: 0,
        shroomTimer: 0,
        shroomCount: 0,
        time: 0,
        width: 20,
        height: 20,
        x: Math.floor(Math.random() * 25) * 20,
        y: 550,
        dx: .1,
        dy: .1,
        maxY: 700 - 20
    };

    if (attract)
      flea.maxY -= 50;
}
//to place a mushroom send in Math.floor x / 20 and y /20;

function update(dTime){
  flea.x += flea.dx * dTime;
  flea.y += flea.dy * dTime;
  flea.time += dTime;
  flea.shroomTimer += dTime;

  if (flea.x < 0) {
    flea.x = 0;
    flea.dx *= -1;
  }

  if (flea.x > 500 - flea.width) {
    flea.x = 500 - flea.width;
    flea.dx *= -1;
  }

  if (flea.y > flea.maxY) {
    flea.y = flea.maxY;
    flea.dy *= -1;
  }

  if (flea.y < 550) {
    flea.y = 550;
    flea.dy *= -1;
  }

  if (flea.time >= 2000) {
    flea.time = 0;
    flea.dx = (Math.random() * .2) - .1;
    flea.dy = (Math.random() * .2) - .1;
  }

  if (!flea.visible) {
    flea.deathTimer += dTime;
    if (flea.deathTimer >= 10000) {
      flea.visible = true;
      flea.deathTimer = 0;
      flea.y = 350;
      flea.x = Math.floor(Math.random() * (500 - flea.width));
    }


  }

  // if (flea.visible && flea.hungry >= 5000) {
  //   var tileX = Math.floor(flea.x / 20) + 1;
  //   var tileY = Math.floor(flea.y / 20) + 1;
  //   if (shrooms.existsAt(tileX, tileY)) {
  //     shrooms.eatAt(tileX, tileY);
  //     flea.hungry = 0;
  //   }
  //}
};

function render(ctx, g){
    if(flea.visible)
        g.drawFlea(ctx, flea.dir, flea.x, flea.y);
};

function pos(){
    return{x: flea.x, y: flea.y, width: flea.width, height: flea.height};
}

function hide(){
    flea.visible = false;
}

function visible(){
    return flea.visible;
}


exports.init = init;
exports.update = update;
exports.render = render;
exports.pos = pos;
exports.hide = hide;
exports.visible = visible;