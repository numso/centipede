var collision = require('./collision');
var bullets   = require('./bullets');
var inp       = require('./input');
var snd       = require('./sounds');
var scores    = require('./states/scores');
var menu      = require('./states/menu');
var shared    = require('./shared');
var peed      = require('./centipede').getPeed;

var player;
var score = 0;
var lives;

var attract = {};

function init() {
  lives = 3;
  score = 0;
  //$('.myScore').text(0);
  lives = 3;
  $('.myScore').text(score);
  $('.lives').html("Lives: " + lives);
  inp.resetKeys();

  player = {
    width: 30,
    height: 50,
    x: 0,
    y: 670,
    dx: .1,
    dy: .1
  };

  attract.shootTime = 0;
  attract.aliveTime = 0;
  attract.direction = 1;
  attract.dirChangeTime = 0;
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

    if(inp.fire()) {
        snd.playEffect('shoot');
        bullets.add(player.x, player.y);
    }

  if (collision.isDead(player)) {
    player.x = 0;
    player.y = 650;
    gameOver();
  }
};

function updateAttract(dTime) {
  attract.shootTime += dTime;
  attract.aliveTime += dTime;
  attract.dirChangeTime += dTime;

  if (attract.shootTime >= 300 && peed().length > 3) {
    snd.playEffect('shoot');
    bullets.add(player.x, player.y);
    attract.shootTime = 0;
  }

  if (attract.aliveTime > 60000 && (player.y - player.dy) > 550) {
    player.y -= player.dy * dTime;
  }

  if (attract.dirChangeTime > 3000) {
    attract.direction = Math.round(Math.random() * 2) - 1;
    attract.dirChangeTime = 0;
  }

  player.x += attract.direction * player.dx * dTime;
  if (player.x > 500 - player.width)
    player.x = 500 - player.width;
  if (player.x < -10)
    player.x = -10

  if (collision.isDead(player)) {
    shared.setState(menu);
  }
}


function gameOver(){
    --lives;
    console.log(lives);
    $('.lives').html("Lives: " + lives);
    if(lives == 0){
      scores.checkScore($('.myScore').html(), function (hasScore) {
        if (hasScore) {
          var resp = prompt('Enter your name');
          if (resp && resp !== '')
            scores.submitScore(score, resp);
        }
        shared.setState(menu);
      });

    }
}

function render(ctx, g){
  g.drawPlayer(ctx, player.x, player.y);
}

exports.init = init;
exports.update = update;
exports.render = render;
exports.attract = updateAttract;

exports.getScore = function () { return score; };
exports.addScore = function (inc) {
  score += inc;
  $('.myScore').text(score);
  if (score > parseInt($('.highestScore').text(), 10))
    $('.highestScore').text(score);
};
