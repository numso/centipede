var spriteSheet;

function drawPlayer(ctx, x, y){
    ctx.drawImage(spriteSheet, 312, 100, 30, 50, x , y, 30, 50);
};

function drawBullet(ctx, x, y){
    ctx.drawImage(spriteSheet, 341, 185, 4, 10, x, y, 4, 10);
};

function drawMushrooms(num, poison, ctx, x, y){
if(!poison){
    if(num == 4)
        ctx.drawImage(spriteSheet, 200, 50, 50, 50, x * 20, y * 20, 20, 20);
    if(num == 3)
        ctx.drawImage(spriteSheet, 250, 50, 50, 50, x * 20, y * 20, 20, 20);
    if(num == 2)
        ctx.drawImage(spriteSheet, 300, 50, 50, 50, x * 20, y * 20, 20, 20);
    if(num == 1)
        ctx.drawImage(spriteSheet, 350, 50, 50, 50, x * 20, y * 20, 20, 20);
}
if(poison){
    if(num == 4)
        ctx.drawImage(spriteSheet, 0, 50, 50, 50, x * 20, y * 20, 20, 20);
    if(num == 3)
        ctx.drawImage(spriteSheet, 100, 50, 50, 50, x * 20, y * 20, 20, 20);
    if(num == 2)
        ctx.drawImage(spriteSheet, 50, 50, 50, 50, x * 20, y * 20, 20, 20);
    if(num == 1)
        ctx.drawImage(spriteSheet, 150, 50, 50, 50, x * 20, y * 20, 20, 20);
}

};

function drawSpider(ctx, x, y){
    ctx.drawImage(spriteSheet, 50, 0, 50, 50, x, y, 40, 40);
};

function drawScorpion(LtoR, ctx, x, y){
  if (LtoR) return ctx.drawImage(spriteSheet, 150, 0, 50, 50, x, y, 20, 20);
  ctx.drawImage(spriteSheet, 300, 0, 50, 50, x, y, 20, 20);
}

function drawPeed(ctx, isHead, RtoL, x, y, state) {
  if (RtoL) {
    if (isHead)
      return ctx.drawImage(spriteSheet, 150 + state * 50, 100, 50, 50, x, y, 20, 20);
    return ctx.drawImage(spriteSheet, 150 + state * 50, 150, 50, 50, x, y, 20, 20);
  }

  if (isHead)
    return ctx.drawImage(spriteSheet, 0 + state * 50, 100, 50, 50, x, y, 20, 20);
  ctx.drawImage(spriteSheet, 0 + state * 50, 150, 50, 50, x, y, 20, 20);
}

function init(){
    spriteSheet = document.createElement('img');
    spriteSheet.src = '/img/spriteSheet.png';
};

exports.drawPlayer =    drawPlayer;
exports.drawBullet =    drawBullet;
exports.drawMushrooms = drawMushrooms;
exports.drawSpider =    drawSpider;
exports.drawScorpion =  drawScorpion;
exports.drawPeed = drawPeed;
exports.init =          init;
