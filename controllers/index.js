var fs = require('fs');

exports.init = function (app) {
  app.get('/',
    attachScores,
    attachUser,
    app.middleware.render('index/index')
  );

  app.post('/updateUser', updateUser);
  app.post('/checkScore', checkScore);
  app.post('/submitScore', submitScore);
};

function attachScores(req, res, next) {
  var data = fs.readFileSync('models/highScores.json');
  res.locals({
    scores: JSON.parse(data)
  });
  next();
}

function attachUser(req, res, next) {
  res.locals({
    user: req.session.user
  });
  next();
}

function updateUser(req, res, next) {
  if (req.body.val === 'true') req.body.val = true;
  if (req.body.val === 'false') req.body.val = false;

  if (req.body.key === 'controls') {
    req.session.user.controls[req.body.key2] = req.body.val;
    return res.send('ok');
  }

  req.session.user[req.body.key] = req.body.val;
  res.send('ok');
}


function checkScore(req, res, next) {
  var newScore = parseInt(req.body.score, 10);
  var data = JSON.parse(fs.readFileSync('models/highScores.json'));

  for (var i = 0; i < data.length; ++i) {
    if (newScore > parseInt(data[i].score, 10)) {
      return res.send(true);
    }
  }
  res.send(false);
}

function submitScore(req, res, next) {
  var newScore = parseInt(req.body.score, 10);
  var newName  = req.body.name;
  var data = JSON.parse(fs.readFileSync('models/highScores.json'));

  for (var i = 0; i < data.length; ++i) {
    if (newScore > parseInt(data[i].score, 10)) {
      data.splice(i, 0, { score: newScore, name: newName });
      if (data.length > 10) data.length = 10;
      fs.writeFileSync('models/highScores.json', JSON.stringify(data));
      return res.send(data);
    }
  }

  res.send(false);
}
