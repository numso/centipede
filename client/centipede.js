var centipede;
var bodyLength = 12;
var position = 200;
var direction = 'right';

function init(){
    centipede = {
        width: 20,
        height: 20,
        body: createBody(20, 20),
        dy: .1
    };
};

function createBody(width, height){
    var newBody = [];
    var piece;

    for(var n = 0; n < bodyLength; ++n){
        if(n == 0)
            piece = 'head';
        else
            piece = 'body';

        var obj = {
            type: piece,
            direction: 'left',
            dropFlag: false,
            dropCount: 0,
            x: position,
            y: 0,
            width: width,
            height: height,
            dx: .1
        }
        newBody.push(obj);

        position += width;
    }
    return newBody;
};

function update(dTime){
    for (var n = 0; n < centipede.body.length; ++n){
        if (centipede.body[n].x > 0 && centipede.body[n].x < (500 - centipede.width) && centipede.body[n].dropFlag == false){
            // if(collision.centipedeMushroom(centipede.body[n], mushrooms))
            //     centipede.body[n].dropFlag = true;
            // else
                centipede.body[n].x -= centipede.body[n].dx * dTime;
        }
        else {
            if (centipede.body[n].dropCount > centipede.height){
                centipede.body[n].dx *= -1;
                centipede.body[n].x -= centipede.body[n].dx * dTime;
                centipede.body[n].dropCount = 0;
                centipede.body[n].dropFlag = false;
                if(n == centipede.body.length -1)
                    setDirection();
            }

            else {
                centipede.body[n].direction = direction;
                centipede.body[n].dropCount += centipede.dy * dTime;
                centipede.body[n].y += centipede.dy * dTime;
            }
        }
    }
};

function setDirection(){
    if(direction == 'left')
        direction = 'right';
    else if(direction == 'right')
        direction = 'left';
    return;
};

function render(ctx, g){
    for(var n = 0; n < centipede.body.length; ++n){
        g.drawCentipede(centipede.body[n].type, centipede.body[n].direction, ctx, centipede.body[n].x, centipede.body[n].y);
    }
};

exports.init = init;
exports.update = update;
exports.render = render;