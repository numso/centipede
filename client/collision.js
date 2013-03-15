function collides(obj1, obj2){
    if(obj2.x + obj2.width  > obj1.x && obj2.x < obj1.x + obj1.width)
        if(obj2.y + obj2.height  > obj1.y && obj2.y < obj1.y + obj1.height)
            return true;

        return false;
};

function Mush(mushrooms, thisBullet){
    for(var n = 0; n < mushrooms.length; ++n)
    {
        if(collides(mushrooms[n], thisBullet))
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
        if(collides(poison[n], thisBullet))
                {
                    --poison[n].size;
                    if(poison[n].size == 0)
                        poison.splice(n, 1);
                    return true;
                }
    }
    return false;
};

function checkPoison(mushrooms, poison, scorpion){
    for(var n = 0; n < mushrooms.length; ++n)
    {
        if(collides(mushrooms[n], scorpion))
            {
                poison.push(mushrooms[n]);
                mushrooms.splice(n, 1);
            }
    }
};

function isDead(scorpion, spider, thisChar){
     return collides(spider, thisChar) || collides(scorpion, thisChar);
};

exports.Mush = Mush;
exports.Poison = Poison;
exports.Spider = collides;
exports.Scorpion = collides;
exports.checkPoison = checkPoison;
exports.isDead = isDead;