var jadify = require('../requires/render')
  , shared = require('../shared')
  , g = require('../graphics')
  , inp = require('../input')
  , snd = require('../sounds')
  , collision = require('../collision')
  ;

var characters = [];
var mushrooms = [];
var poison = [];
var spider, scorpion, centipede;
var bodyLength = 12;
//temporary used for bounds checking on the centipede
var gameWidth = 1000;
var edgeFlag = false;

function start() {
  snd.playMusic('game');
}

function stop() {
  snd.playMusic();
}

function init(){
    characters.push({
        bullets: [],
        width: 30,
        height: 50,
        x: 0,
        y: 650,
        dx: .1,
        dy: .1
   });

    spider = {
        time: 0,
        deathTimer: 0,
        visible: true,
        width: 40,
        height: 40,
        x: 1,
        y: 450,
        dx: .2,
        dy: .2
    };

    scorpion = {
        visible: true,
        direction: 'right',
        width: 20,
        height: 20,
        x: 1,
        y: Math.floor(Math.random() * 600),
        dx: .1
    };

    centipede = {
        width: 20,
        height: 20,
        body: createBody(20, 20),
        dy: .1
    };

       placeMushrooms();
};

function createBody(width, height){
    var newBody = [];
    var position = 500;

    newBody.push({
        type: 'head',
        direction: 'left',
        dropFlag: false,
        dropCount: 0,
        x: (500 - width),
        y: (0 + height),
        width: 20,
        height: 20,
        dx: .1
    });

    for(var n = 0; n < bodyLength - 1; ++n){
        newBody.push({
            type: 'body',
            direction: 'left',
            dropFlag: false,
            dropCount: 0,
            x: position,
            y: (0 + height),
            width: 20,
            height: 20,
            dx: .1
        });
        position += width;
    }
    console.log(newBody);
    return newBody;
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
        if(inp.left() && (characters[n].x - characters[n].dx) > -10){
            characters[n].x -= characters[n].dx * dTime;
            if(collision.cantMove(mushrooms, characters[n]))
                characters[n].x += characters[n].dx * dTime;
        }

        if(inp.right() && (characters[n].x + characters[n].dx) < (500 - characters[n].width)){
            characters[n].x += characters[n].dx * dTime;
            if(collision.cantMove(mushrooms, characters[n]))
                characters[n].x -= characters[n].dx * dTime;
        }

        if(inp.up() && (characters[n].y - characters[n].dy) > 550){
            characters[n].y -= characters[n].dy * dTime;
            if(collision.cantMove(mushrooms, characters[n]))
                characters[n].y += characters[n].dy * dTime;
        }

        if(inp.down() && (characters[n].y + characters[n].dy) < (700 - characters[n].height)){
            characters[n].y += characters[n].dy * dTime;
            if(collision.cantMove(mushrooms, characters[n]))
                characters[n].y -= characters[n].dy * dTime;
        }

        if(inp.fire()) {
            snd.playEffect('shoot');
            addBullet(characters[n]);
        }
        if(collision.isDead(spider, characters[n]))
            {
                characters[n].x = 0;
                characters[n].y = 650;
            }
        //bullet position
        for(var m = 0; m < characters[n].bullets.length; ++m)
            {
                characters[n].bullets[m].y -= characters[n].bullets[m].dy * dTime;
                if(collision.Spider(spider, characters[n].bullets[m]) && spider.visible)
                    {
                        spider.visible = false;
                        characters[n].bullets.splice(m, 1);
                        --m;
                        continue;
                    }
                if(collision.Scorpion(scorpion, characters[n].bullets[m]) && scorpion.visible)
                    {
                        scorpion.visible = false;
                        characters[n].bullets.splice(m, 1);
                        --m;
                        continue;
                    }
                if(collision.Mush(mushrooms, characters[n].bullets[m]))
                    {
                        characters[n].bullets.splice(m, 1);
                        --m;
                        continue;
                    }
                if(collision.Poison(poison, characters[n].bullets[m]))
                    {
                        characters[n].bullets.splice(m, 1);
                        --m;
                        continue;
                    }
                if(characters[n].bullets[m].y < 0)
                    {
                        characters[n].bullets.splice(m, 1);
                        --m;
                        continue;
                    }
            }
    }

    //scorpion position
    if(scorpion.visible){
        if(scorpion.x > 0 && scorpion.x < (500 - scorpion.width))
            {
                scorpion.x += scorpion.dx * dTime;
                collision.checkPoison(mushrooms, poison, scorpion);
            }
        else
        {
            setDirection(scorpion);
            scorpion.dx *= -1;
            scorpion.x += scorpion.dx * dTime;
            scorpion.y = Math.floor(Math.random() * 550 - scorpion.height);
        }
    }

    //spider position
    if(spider.x > 0 && spider.x < (500 - spider.width))
        spider.x += spider.dx * dTime;
    else
        {
            spider.dx *= -1;
            spider.x += spider.dx * dTime;
        }

    if(spider.y + spider.height < 700 && spider.y > 449)
        spider.y -= spider.dy * dTime;
    else{
        spider.dy *= -1;
        spider.y -= spider.dy * dTime;
    }

    spider.time += dTime;
    if(spider.time >= 2000){
        spider.time = 0;
        spider.dx = (Math.random() * .4) -.2;
        spider.dy = (Math.random() * .4) -.2;
    }

    if(!spider.visible){
        spider.deathTimer += dTime;
        if(spider.deathTimer >= 10000){
            spider.visible = true;
            spider.deathTimer = 0;
            spider.y = Math.floor(Math.random() * 50) + 500;
        }  
    }

    //centipede position
    for (var n = 0; n < centipede.body.length; ++n){
        if (centipede.body[n].x > 0 && centipede.body[n].x < gameWidth && centipede.body[n].dropFlag == false){
            if(collision.centipedeMushroom(centipede.body[n], mushrooms))
                centipede.body[n].dropFlag = true;
            else
                centipede.body[n].x -= centipede.body[n].dx * dTime;
        }
        else {
            
            if (edgeFlag == false){
                gameWidth = 500 - centipede.width;
                edgeFlag = true;
            }
            if (centipede.body[n].dropCount > centipede.height){
                centipede.body[n].dx *= -1;
                centipede.body[n].x -= centipede.body[n].dx * dTime;
                centipede.body[n].dropCount = 0;
                centipede.body[n].dropFlag = false;
            }

            else {
                setDirection(centipede.body[n]);
                centipede.body[n].dropCount += centipede.dy * dTime;
                centipede.body[n].y += centipede.dy * dTime;
            }
        }
    }


};

function setDirection(thisBodyPart){
    if(thisBodyPart.direction == 'left')
        thisBodyPart.direction = 'right';
    else if(thisBodyPart.direction == 'right')
        thisBodyPart.direction = 'left';
    return;
};

function addBullet(thisChar){
    thisChar.bullets.push({
        width: 4,
        height: 10,
        x: thisChar.x + 20,
        y: thisChar.y,
        dy: .3
    });
};


function render(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 700);
    for(var n = 0; n < characters.length; ++n){
        g.drawPlayer(ctx, characters[n].x, characters[n].y);
        for(var m = 0; m < characters[n].bullets.length; ++m)
            g.drawBullet(ctx, characters[n].bullets[m].x, characters[n].bullets[m].y);
    }
    for(var n = 0; n < mushrooms.length; ++n)
        g.drawMushrooms(mushrooms[n].size, ctx, mushrooms[n].x, mushrooms[n].y);
    for(var n = 0; n < poison.length; ++n)
        g.drawPoison(poison[n].size, ctx, poison[n].x, poison[n].y);
    for(var n = 0; n < centipede.body.length; ++n)
        g.drawCentipede(centipede.body[n].type, centipede.body[n].direction, ctx, centipede.body[n].x, centipede.body[n].y);

    if(scorpion.visible)
        g.drawScorpion(scorpion.direction, ctx, scorpion.x, scorpion.y);
    if(spider.visible)
        g.drawSpider(ctx, spider.x, spider.y);
};

exports.start  = start;
exports.stop   = stop;
exports.update = update;
exports.render = render;
exports.init   = init;
exports.str    = 'slide-game';

