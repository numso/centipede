var fs = require('fs');

exports.init = function (app) {
  app.get('/c',
    attachNoCode,
    app.middleware.render('index/controller')
  );

  app.get('/c/:code',
    attachCode,
    app.middleware.render('index/controller')
  );

  app.post('/saveUser',
    saveUser
  );
};

function attachNoCode(req, res, next) {
  res.locals({
    code: '',
    user: req.session.user
  });
  next();
}

function attachCode(req, res, next) {
  var code = req.params.code;
  res.locals({
    code: code,
    user: req.session.user
  });
  next();
}

function saveUser(req, res, next) {
  req.session.user.name = req.body.name;
  res.send('ok');
}
