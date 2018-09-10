var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var registerServer = function (app, routePath) {
  var helloWorld = express();

  helloWorld.get('/', function (req, res, next) {
    try{
      res.send('Hello World!');
    } catch(ex){
      next(ex);
    }
  });

  helloWorld.post('/', function (req, res, next) {
    try{
      res.send('World Hello!');
    } catch(ex){
      next(ex);
    }
  });

  app.use(routePath, helloWorld);
  return app;
};

module.exports = {
  registerServer: registerServer
};






