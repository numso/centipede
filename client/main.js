window.require = require;
var render = require('./requires/render');
var scores = undefined;

$('.gameScreen').html(render('mainMenu'));
bindHandlers();

$.get('/getHighScores', function(data){
    scores = JSON.parse(data);
});


function bindHandlers(){
    
    //Buttons
    $('.newGame').click(function(){
        $('.gameScreen').html(render('newGame'));
        bindHandlers();
    });

    $('.highScores').click(function(){
        
        $('.gameScreen').html(render('highScores', {hsScores: scores}));
        bindHandlers();
    });

    $('.settings').click(function(){
        $('.gameScreen').html(render('settings'));
        bindHandlers();
    });

    $('.credits').click(function(){
        $('.gameScreen').html(render('credits'));
        bindHandlers();
    });

    $('.exit').click(function(){
        window.open('', '_self', '');
        window.close();
    });
    
    $('.back').click(function(){
        $('.gameScreen').html(render('mainMenu'));
        bindHandlers();
    });  
};