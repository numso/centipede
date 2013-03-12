var jadify = require('../requires/render')
  , shared = require('../shared')
  , g = require('../graphics')
  , inp = require('../input')
  ;

var characters = [];
var bullets = [];
var mushrooms = [];

function start() {
  $('.gameScreen').html(jadify('game'));
  shared.bindBackButton();
};

function init(){
       characters.push({
        width: 30,
        height: 50,
        x: 0,
        y: 650,
        dx: .1,
        dy: .1
   });

       placeMushrooms();
};

function placeMushrooms(){
    for(var n = 0; n < 50; ++n)
        mushrooms.push({
            size: 4,
            width: 20,
            height: 20,
            x: Math.floor(Math.random()* 25) * 20,
            y: Math.floor(Math.random()* 30) * 20
        });
};

function update(dTime){
    //character position
    for(var n = 0; n < characters.length; ++n){
        if(inp.left() && (characters[n].x - characters[n].dx) > -10)
            characters[n].x -= characters[n].dx * dTime;
        if(inp.right() && (characters[n].x + characters[n].dx) < (500 - characters[n].width))
            characters[n].x += characters[n].dx * dTime;
        if(inp.up() && (characters[n].y - characters[n].dy) > 0)
            characters[n].y -= characters[n].dy * dTime;
        if(inp.down() && (characters[n].y + characters[n].dy) < (700 - characters[n].height))
            characters[n].y += characters[n].dy * dTime;
        if(inp.fire())
            addBullet(characters[n]);
    }

    //bullet position
    for(var n = 0; n < bullets.length; ++n)
        {
            bullets[n].y -= bullets[n].dy * dTime;
            if(checkCollision(bullets[n]))
                {
                    bullets.splice(n, 1);
                    --n;
                }
        }
};

function addBullet(thisChar){
    bullets.push({
        width: 4,
        height: 10,
        x: thisChar.x + 20,
        y: thisChar.y,
        dy: .3
    });
};

function checkCollision(thisBullet){
    for(var n = 0; n < mushrooms.length; ++n)
    {
        if(thisBullet.x > mushrooms[n].x && thisBullet.x < mushrooms[n].x + mushrooms[n].width)
            if(thisBullet.y < mushrooms[n].y + mushrooms[n].height)
                {
                    --mushrooms[n].size;
                    if(mushrooms[n].size == 0)
                        mushrooms.splice(n, 1);
                    return true;
                }

    }
    return false;
};

function render(ctx){
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 500, 700);
    for(var n = 0; n < characters.length; ++n)
        g.drawPlayer(ctx, characters[n].x, characters[n].y);
    for(var n = 0; n < bullets.length; ++n)
        g.drawBullet(ctx, bullets[n].x, bullets[n].y);
    for(var n = 0; n < mushrooms.length; ++n)
        g.drawMushrooms(mushrooms[n].size, ctx, mushrooms[n].x, mushrooms[n].y);
};

exports.start = start;
exports.update = update;
exports.render = render;
exports.init = init;
