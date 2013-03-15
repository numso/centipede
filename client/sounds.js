var sound;
var click;
function playMusic(){
    sound = new Howl({urls: ['/snd/tron.mp3'], autoplay: true, loop: true, volume: .5});
}

function stopMusic(){
    sound.stop();
}

function playClick(){
    click = new Howl({});
}

exports.playMusic = playMusic;
exports.stopMusic = stopMusic;
exports.playClick = playClick;