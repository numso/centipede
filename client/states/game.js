var jadify = require('../requires/render')
  , shared = require('../shared')
  , g = require('../graphics')
  , inp = require('../input')
  , snd = require('../sounds')
  , collision = require('../collision')
  , centipede = require('../centipede')
  , shrooms = require('../shrooms')
  , playa = require('../playa')
  , bullets = require('../bullets')
  , scorpion = require('../scorpion')
  , spider = require('../spider')
  , flea = require('../flea')
  ;
var gameOver;

function start() {
  snd.playMusic('game');

  $('.playAgain').css('visibility', 'hidden');
  gameOver = false;

  playa.init();
  spider.init();
  scorpion.init();
  centipede.init();
  shrooms.init();
  flea.init();
}

function stop() {
  snd.playMusic();
}

function init() {};

function update(dTime){
  if(gameOver)return;
    playa.update(dTime);
    bullets.update(dTime);
    spider.update(dTime);
    scorpion.update(dTime);
    centipede.update(dTime);
    flea.update(dTime);
};


function render(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 700);
    shrooms.render(ctx, g);
    playa.render(ctx, g);
    bullets.render(ctx, g);
    spider.render(ctx, g);
    scorpion.render(ctx, g);
    centipede.render(ctx, g);
    flea.render(ctx, g);
};

function setGameOver(){
  gameOver = true;
};

exports.start  = start;
exports.stop   = stop;
exports.setGameOver = setGameOver;
exports.update = update;
exports.render = render;
exports.init   = init;
exports.str    = 'slide-game';

