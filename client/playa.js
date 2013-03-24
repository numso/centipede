var collision = require('./collision');
var bullets   = require('./bullets');
var inp       = require('./input');
var snd       = require('./sounds');

var player;
var score = 0;

function init() {
  score = 0;
  $('.myScore').text(0);

  player = {
    width: 30,
    height: 50,
    x: 0,
    y: 670,
    dx: .1,
    dy: .1
  };
}

function update(dTime){
  if (inp.left() && (player.x - player.dx) > -10) {
    player.x -= player.dx * dTime;
    // if(collision.cantMove(mushrooms, player))
    //     player.x += player.dx * dTime;
  }

  if (inp.right() && (player.x + player.dx) < (500 - player.width)) {
    player.x += player.dx * dTime;
    // if(collision.cantMove(mushrooms, player))
    //     player.x -= player.dx * dTime;
  }

  if (inp.up() && (player.y - player.dy) > 550) {
    player.y -= player.dy * dTime;
    // if(collision.cantMove(mushrooms, player))
    //     player.y += player.dy * dTime;
  }

  if (inp.down() && (player.y + player.dy) < (700 - player.height)) {
    player.y += player.dy * dTime;
    // if(collision.cantMove(mushrooms, player))
    //     player.y -= player.dy * dTime;
  }

  if (inp.fire()) {
    snd.playEffect('shoot');
    bullets.add(player.x, player.y);
  }

  if (collision.isDead(player)) {
    player.x = 0;
    player.y = 650;
  }
}

function render(ctx, g){
  g.drawPlayer(ctx, player.x, player.y);
}

exports.init = init;
exports.update = update;
exports.render = render;

exports.getScore = function () { return score; };
exports.addScore = function (inc) {
  score += inc;
  $('.myScore').text(score);
  if (score > parseInt($('.highestScore').text(), 10))
    $('.highestScore').text(score);
};
