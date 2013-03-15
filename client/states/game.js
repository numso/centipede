var jadify = require('../requires/render')
  , shared = require('../shared')
  , g = require('../graphics')
  , inp = require('../input')
  ;

var characters = [];
var bullets = [];
var mushrooms = [];
var poison = [];
var spider, scorpion;

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

    spider = {
        visible: true,
        width: 40,
        height: 40,
        x: 1,
        y: 550,
        dx: .2,
        dy: .2
    };

    scorpion = {
        visible: true,
        width: 20,
        height: 20,
        x: 1,
        y: Math.floor(Math.random() * 600),
        dx: .1
    };

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
            if(checkCollisionSpider(bullets[n]) && scorpion.visible)
                {
                    bullets.splice(n, 1);
                    --n;
                }
            if(checkCollisionScorpion(bullets[n]) && scorpion.visible)
                {
                    bullets.splice(n, 1);
                    --n;
                }
            if(checkMushroomCollision(bullets[n]))
                {
                    bullets.splice(n, 1);
                    --n;
                }
        }

    //scorpion position
    if(scorpion.visible){
        if(scorpion.x > 0 && scorpion.x < (500 - scorpion.width))
            {
                scorpion.x += scorpion.dx * dTime;
                checkPoison(scorpion);
            }
        else
        {
            scorpion.dx *= -1;
            scorpion.x += scorpion.dx * dTime;
            scorpion.y = Math.floor(Math.random() * 700 - scorpion.height);
        }
    }

    //spider position
    if(scorpion.visible){
        if(spider.x > 0 && spider.x < (500 - spider.width))
            spider.x += spider.dx * dTime;
        else
            {
                spider.dx *= -1;
                spider.x += spider.dx * dTime;
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

function checkMushroomCollision(thisBullet){
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

function checkCollisionSpider(thisBullet){
    if(thisBullet.x > spider.x && thisBullet.x < spider.x + spider.width)
        if(thisBullet.y < spider.y + spider.height)
            {
                spider.visible = false;
                return true;
            }

    return false;
};

function checkCollisionScorpion(thisBullet){
    if(thisBullet.x > scorpion.x && thisBullet.x < scorpion.x + scorpion.width)
        if(thisBullet.y < scorpion.y + scorpion.height)
            {
                scorpion.visible = false;
                return true;
            }

    return false;
};

function checkPoison(thisScorpion){
    for(var n = 0; n < mushrooms.length; ++n)
    {
        if( mushrooms[n].x < thisScorpion.x + thisScorpion.width && thisScorpion.x < mushrooms[n].x + mushrooms[n].width)
            if(mushrooms[n].y < thisScorpion.y + thisScorpion.height && thisScorpion.y < mushrooms[n].y + mushrooms[n].height)
            {
                poison.push(mushrooms[n]);
                mushrooms.splice(n, 1);
            }
    }
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
    for(var n = 0; n < poison.length; ++n)
        g.drawPoison(poison[n].size, ctx, poison[n].x, poison[n].y);

    if(scorpion.visible)
        g.drawScorpion(ctx, scorpion.x, scorpion.y);
    if(spider.visible)
        g.drawSpider(ctx, spider.x, spider.y);
};

exports.start = start;
exports.update = update;
exports.render = render;
exports.init = init;
