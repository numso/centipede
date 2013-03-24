var fs = require('fs');

exports.init = function (app) {
  app.get('/c',
    app.middleware.render('index/controller')
  );

  app.get('/c/:code',
    attachCode,
    app.middleware.render('index/controller')
  );
};

function attachCode(req, res, next) {
  var code = req.params.code;
  res.locals({
    code: code
  });
  next();
}
