var bullets = [];
var spider = require('./spider')
,   scorpion = require('./scorpion')
,   peed = require('./centipede')
,   collision = require('./collision')
  , shrooms   = require('./shrooms')
;

function add(x, y){
    bullets.push({
        width: 4,
        height: 10,
        x: x + 20,
        y: y,
        dy: .3
    });
};

function update(dTime){
    for(var n = 0; n < bullets.length; ++n)
    {
        bullets[n].y -= bullets[n].dy * dTime;
        if(collision.Spider(spider.pos(), bullets[n]) && spider.visible())
            {
                bullets.splice(n, 1);
                --n;
                spider.hide();
                continue;
            }
        if(collision.Scorpion(scorpion.pos(), bullets[n]) && scorpion.visible())
            {
                bullets.splice(n--, 1);
                --n;
                scorpion.hide();
                continue;
            }

        var centipeed = peed.getPeed();
        var ind = collision.Peed(bullets[n], centipeed);
        if (ind !== -1) {
            bullets.splice(n--, 1);
            var newX = Math.floor(centipeed[ind].x / 20);
            var newY = Math.floor(centipeed[ind].y / 20);
            shrooms.createShroom(newX, newY);
            peed.killPiece(ind);
            continue;
        }

        var tileX = Math.floor(bullets[n].x / 20);
        var tileY = Math.round(bullets[n].y / 20);
        if (shrooms.existsAt(tileX, tileY)) {
          shrooms.destroyAt(tileX, tileY);
          bullets.splice(n--, 1);
          continue;
        }
        if(bullets[n].y < 0)
            {
                bullets.splice(n, 1);
                --n;
                continue;
            }
    }

};

function render(ctx, g){
    for(var n = 0; n < bullets.length; ++n)
        g.drawBullet(ctx, bullets[n].x, bullets[n].y);
};

exports.add = add;
exports.update = update;
exports.render = render;
