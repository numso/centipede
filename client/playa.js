var collision = require('./collision');
var bullets = require('./bullets');
var inp = require('./input');
var snd = require('./sounds');
var players = [];

function init() {
  players.length = 0;
  players.push({
    width: 30,
    height: 50,
    x: 0,
    y: 670,
    dx: .1,
    dy: .1
  });
}

function update(dTime){
    for(var n = 0; n < players.length; ++n){
        if(inp.left() && (players[n].x - players[n].dx) > -10){
            players[n].x -= players[n].dx * dTime;
            // if(collision.cantMove(mushrooms, players[n]))
            //     players[n].x += players[n].dx * dTime;
        }

        if(inp.right() && (players[n].x + players[n].dx) < (500 - players[n].width)){
            players[n].x += players[n].dx * dTime;
            // if(collision.cantMove(mushrooms, players[n]))
            //     players[n].x -= players[n].dx * dTime;
        }

        if(inp.up() && (players[n].y - players[n].dy) > 550){
            players[n].y -= players[n].dy * dTime;
            // if(collision.cantMove(mushrooms, players[n]))
            //     players[n].y += players[n].dy * dTime;
        }

        if(inp.down() && (players[n].y + players[n].dy) < (700 - players[n].height)){
            players[n].y += players[n].dy * dTime;
            // if(collision.cantMove(mushrooms, players[n]))
            //     players[n].y -= players[n].dy * dTime;
        }

        if(inp.fire()) {
            snd.playEffect('shoot');
            bullets.add(players[n].x, players[n].y);
        }
        // if(collision.isDead(spider, players[n]))
        //     {
        //         players[n].x = 0;
        //         players[n].y = 650;
        //     }
    }
};

function render(ctx, g){
    for(var n = 0; n < players.length; ++n)
        g.drawPlayer(ctx, players[n].x, players[n].y);
};


exports.init = init;
exports.update = update;
exports.render = render;
