var spider = require('./spider')
  , flea   = require('./flea');
  , peed   = require('./centipede')
  ;

function collides(obj1, obj2){
    if(obj2.x + obj2.width  > obj1.x && obj2.x < obj1.x + obj1.width)
        if(obj2.y + obj2.height  > obj1.y && obj2.y < obj1.y + obj1.height)
            return true;

        return false;
};

function centipedeMushroom(centipede, mushrooms){
    for(var n = 0; n < mushrooms.length; ++n){
        if(collides(mushrooms[n], centipede))
            {
                return true;
            }
    }
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

function Peed(bullet, peed) {
  for (var j = 0; j < peed.length; ++j) {
    if (collides(bullet, peed[j])) {
      return j;
    }
  }
  return -1;
}

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

function isDead(thisChar){
    var thisPeed = peed.getPeed();
    for (var n = 0; n < thisPeed.length; ++n){
        if (collides(thisPeed[n], thisChar))
            return true;
    }
    return (collides(spider.pos(), thisChar) && spider.visible()) || (collides(flea.pos(), thisChar) && flea.visible());
}

function cantMove(mushrooms, thisChar){
    for(var n = 0; n < mushrooms.length; ++n){
        if(collides(mushrooms[n], thisChar))
            return true;
    }
    return false;
};

exports.Mush = Mush;
exports.Poison = Poison;
exports.Spider = collides;
exports.Scorpion = collides;
exports.Flea = collides;
exports.Peed = Peed
exports.checkPoison = checkPoison;
exports.isDead = isDead;
exports.cantMove = cantMove;
exports.centipedeMushroom = centipedeMushroom;
