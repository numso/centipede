var collision = require('./collision');
var scorpion;

function init(){
    scorpion = {
        visible: true,
        direction: 'right',
        width: 20,
        height: 20,
        x: 1,
        y: Math.floor(Math.random() * 600),
        dx: .1
    };    
};

function update(dTime){
    if(scorpion.visible){
        if(scorpion.x > 0 && scorpion.x < (500 - scorpion.width))
            {
                scorpion.x += scorpion.dx * dTime;
                //collision.checkPoison(scorpion);
            }
        else
        {
            setDirection(scorpion);
            scorpion.dx *= -1;
            scorpion.x += scorpion.dx * dTime;
            scorpion.y = Math.floor(Math.random() * 550 - scorpion.height);
        }
    }
};

function render(ctx, g){
    if(scorpion.visible)
        g.drawScorpion(scorpion.direction, ctx, scorpion.x, scorpion.y);
};

function setDirection(changeMe){
    if(changeMe.direction == 'left')
        changeMe.direction = 'right';
    else if(changeMe.direction == 'right')
        changeMe.direction = 'left';
    return;
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