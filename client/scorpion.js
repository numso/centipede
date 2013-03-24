var collision = require('./collision')
  , shrooms   = require('./shrooms');

var scorpion;

function init(){
    scorpion = {
        visible: true,
        goingRight: true,
        width: 20,
        height: 20,
        x: -100,
        y: Math.floor(Math.random() * 25) * 20,
        dx: .1
    };
};

function update(dTime){
    if(scorpion.visible){
        scorpion.x += scorpion.dx * dTime;

        if (scorpion.x < -400) {
            scorpion.x = -400;
            randomizePos();
        }

        if (scorpion.x > 900) {
            scorpion.x = 900;
            randomizePos();
        }

        var tileX = Math.floor(scorpion.x/20);
        var tileY = Math.floor(scorpion.y/20);
        if (shrooms.existsAt(tileX, tileY)) {
          shrooms.poisonAt(tileX, tileY);
        }
    }
};

function randomizePos() {
  scorpion.goingRight = !scorpion.goingRight;
  scorpion.dx *= -1;
  scorpion.y = Math.floor(Math.random() * 25) * 20;
}

function render(ctx, g){
    if(scorpion.visible)
        g.drawScorpion(scorpion.goingRight, ctx, scorpion.x, scorpion.y);
};

function pos(){
    return {x: scorpion.x, y: scorpion.y, width: scorpion.width, height: scorpion.height};
};

function hide(){
    scorpion.visible = false;
};

function visible(){
    return scorpion.visible;
};


exports.init = init;
exports.update = update;
exports.render = render;
exports.pos = pos;
exports.hide = hide;
exports.visible = visible;
