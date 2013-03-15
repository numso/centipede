function Mush(mushrooms, thisBullet){
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

function Poison(poison, thisBullet){
    for(var n = 0; n < poison.length; ++n)
    {
        if(thisBullet.x > poison[n].x && thisBullet.x < poison[n].x + poison[n].width)
            if(thisBullet.y < poison[n].y + poison[n].height)
                {
                    --poison[n].size;
                    if(poison[n].size == 0)
                        poison.splice(n, 1);
                    return true;
                }
    }
    return false;
};


function Spider(spider, thisBullet){
    if(thisBullet.x > spider.x && thisBullet.x < spider.x + spider.width)
        if(thisBullet.y < spider.y + spider.height)
                return true;
    return false;
};

function Scorpion(scorpion, thisBullet){
    if(thisBullet.x > scorpion.x && thisBullet.x < scorpion.x + scorpion.width)
        if(thisBullet.y < scorpion.y + scorpion.height)
                return true;
    return false;
};

function checkPoison(mushrooms, poison, thisScorpion){
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


function isDead(scorpion, spider, thisChar){
    if(charVSSpider(spider, thisChar))
        return true;
    else if(charVSScorpion(scorpion, thisChar))
        return true;
    
    else
        return false;
};

function charVSSpider(spider, thisChar){
    if(thisChar.x + thisChar.width  > spider.x && thisChar.x < spider.x + spider.width)
        if(thisChar.y + thisChar.height  > spider.y && thisChar.y < spider.y + spider.height)

            return true;

    return false;
};

function charVSScorpion(scorpion, thisChar){
    if(thisChar.x + thisChar.width > scorpion.x && thisChar.x < scorpion.x + scorpion.width)
        if(thisChar.y + thisChar.height > scorpion.y && thisChar.y < scorpion.y + scorpion.height)
            return true;

    return false;
};

exports.Mush = Mush;
exports.Poison = Poison;
exports.Spider = Spider;
exports.Scorpion = Scorpion;
exports.checkPoison = checkPoison;
exports.isDead = isDead;