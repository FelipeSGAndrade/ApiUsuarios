var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

module.exports = function(){
  var app = express();

  app.set('port', process.env.PORT || 3000);
  app.set('secret', 'concreteSolutions');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.jwt = jwt;
  app.crypto = crypto;

  load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
