var spider;

function init(){
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
};

function update(dTime){
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
};

function render(ctx, g){
    if(spider.visible)
        g.drawSpider(ctx, spider.x, spider.y);
};

function pos(){
    return {x: spider.x, y: spider.y, width: spider.width, height: spider.height};
};

function hide(){
    spider.visible = false;
};

function visible(){
    return spider.visible;
};


exports.init = init;
exports.update = update;
exports.render = render;
exports.pos = pos;
exports.hide = hide;
exports.visible = visible;