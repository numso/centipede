var spriteSheet;

function drawPlayer(ctx, x, y){
    ctx.drawImage(spriteSheet, 312, 100, 30, 50, x , y, 30, 50);
};

function drawBullet(ctx, x, y){
    ctx.drawImage(spriteSheet, 341, 185, 4, 10, x, y, 4, 10);
};

function drawMushrooms(num, ctx, x, y){
    if(num == 4)
        ctx.drawImage(spriteSheet, 200, 50, 50, 50, x, y, 20, 20);
    if(num == 3)
        ctx.drawImage(spriteSheet, 250, 50, 50, 50, x, y, 20, 20);
    if(num == 2)
        ctx.drawImage(spriteSheet, 300, 50, 50, 50, x, y, 20, 20);
    if(num == 1)
        ctx.drawImage(spriteSheet, 350, 50, 50, 50, x, y, 20, 20);
};

function drawSpider(ctx, x, y){
    ctx.drawImage(spriteSheet, 50, 0, 50, 50, x, y, 40, 40);
};

function drawScorpion(ctx, x, y){
    ctx.drawImage(spriteSheet, 150, 0, 50, 50, x, y, 20, 20);
};

function drawPoison(num, ctx, x, y){
    if(num == 4)
        ctx.drawImage(spriteSheet, 0, 50, 50, 50, x, y, 20, 20);
    if(num == 3)
        ctx.drawImage(spriteSheet, 100, 50, 50, 50, x, y, 20, 20);
    if(num == 2)
        ctx.drawImage(spriteSheet, 50, 50, 50, 50, x, y, 20, 20);
    if(num == 1)
        ctx.drawImage(spriteSheet, 150, 50, 50, 50, x, y, 20, 20);
};

function init(){
    spriteSheet = document.createElement('img');
    spriteSheet.src = '/img/spriteSheet.png';
};

exports.drawPlayer =    drawPlayer;
exports.drawBullet =    drawBullet;
exports.drawMushrooms = drawMushrooms;
exports.drawSpider =    drawSpider;
exports.drawPoison =    drawPoison;
exports.drawScorpion =  drawScorpion;
exports.init =          init;