var fs = require('fs');
exports.init = function (app) {

  app.get('/',
    app.middleware.render('index/index')
  );
  app.get('/getHighScores',
    getHighScores
  );

};

function getHighScores(req, res, next){
    var data = fs.readFileSync('models/highScores.JSON');
    res.send(data);
};