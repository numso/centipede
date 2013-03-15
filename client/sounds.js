var shared = require('./shared');

var bg = {
    game: { snd: ['/snd/tron.mp3'], vol: .25 },
    menu: { snd: ['/snd/eternal.mp3'], vol: .25 }
  }
  , fx = {
    click: { snd: ['/snd/click.mp3'], vol: 1.0 },
    shoot: { snd: ['/snd/shoot.mp3'], vol: .5 }
  };

function init() {
  for (var key in bg)
    bg[key] = new Howl({ urls: bg[key].snd, loop: true, volume: bg[key].vol });

  for (var key in fx)
    fx[key] = new Howl({ urls: fx[key].snd, volume: fx[key].vol });
}

function playMusic(type) {
  type = type || 'menu';
  stopMusic();
  if (shared.user.bgmusic)
    bg[type].play();
}

function stopMusic() {
  bg.game.pause();
  bg.menu.pause();
}

function playEffect(type) {
  type = type || 'click';
  if (shared.user.soundfx)
    fx[type].play();
}

exports.init       = init;
exports.playMusic  = playMusic;
exports.stopMusic  = stopMusic;
exports.playEffect = playEffect;
