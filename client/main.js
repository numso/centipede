window.require = require;
var render = require('./requires/render');

$('.gameScreen').html(render('mainMenu'));
bindHandlers();


function bindHandlers(){
    
    //Buttons
    $('.newGame').click(function(){
        console.log("Inside New Game");
        $('.gameScreen').html(render('newGame'));
        bindHandlers();
    });

    $('.highScores').click(function(){
        console.log("Inside High Scores");
        $('.gameScreen').html(render('highScores', {names: ["Justin", "Dallin", "Tarah"]}));
        bindHandlers();
    });

    $('.settings').click(function(){
        console.log("Inside settings");
        $('.gameScreen').html(render('settings'));
        bindHandlers();
    });

    $('.credits').click(function(){
        console.log("Inside Credits");
        $('.gameScreen').html(render('credits'));
        bindHandlers();
    });

    $('.exit').click(function(){
        window.open('', '_self', '');
        window.close();
    });
    
    $('.back').click(function(){
        console.log("You clicked the back button! ZOMG ");
        $('.gameScreen').html(render('mainMenu'));
        bindHandlers();
    });  
};