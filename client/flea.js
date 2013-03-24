var flea;
function init(){
    flea = {
        dir: "right",
        visible: true,
        deathTimer: 0,
        time: 0,
        x: Math.floor(Math.random() * 25) * 20,
        y: 650,
        dx: .2,
        dy: .2
    };
}
//to place a mushroom send in Math.floor x / 20 and y /20;

function update(dTime){
    if(flea.x > 0 && flea.x < (500 - flea.width))
        flea.x += flea.dx * dTime;
    else
        {
            flea.dx *= -1;
            flea.x += flea.dx * dTime;
        }

    if(flea.y + flea.height < 700 && flea.y > 449)
        flea.y -= flea.dy * dTime;
    else{
        flea.dy *= -1;
        flea.y -= flea.dy * dTime;
    }

    flea.time += dTime;
    if(flea.time >= 2000){
        flea.time = 0;
        flea.dx = (Math.random() * .4) -.2;
        flea.dy = (Math.random() * .4) -.2;
    }

    if(!flea.visible){
        flea.deathTimer += dTime;
        if(flea.deathTimer >= 10000){
            flea.visible = true;
            flea.deathTimer = 0;
            flea.y = Math.floor(Math.random() * 50) + 500;
        }  
    }
};

function render(ctx, g){
    g.drawFlea(ctx, flea.dir, flea.x, flea.y);
};


exports.init = init;
exports.update = update;
exports.render = render;