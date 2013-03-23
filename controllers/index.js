var fs = require('fs');

exports.init = function (app) {
  app.get('/',
    attachScores,
    attachUser,
    app.middleware.render('index/index')
  );

  app.post('/updateUser',
    updateUser
  );
};

function attachScores(req, res, next){
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
