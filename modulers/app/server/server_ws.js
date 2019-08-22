/**
 * Created by acommuni on 28/07/2015.
 */
var express = require('express');
var timeout = require('connect-timeout');
var bodyParser = require('body-parser');

var logHelper = require('../common/log');
var db = require('../common/database');
var utils = require('../common/utils');
var middleware = require('../common/middleware');
var config = require('./config');
var path = require('path');
var pckjson = require('../../package.json');
var helloWorld = require('./helloWorld');
/**
 * Server module
 */
var app;
var connection;
/**
 * Build web service server with all registered paths
 *
 * @returns {{}}
 */
var buildServer = function() {
  app = express();
  app.use(middleware.timeoutHandler);
  app.use(middleware.requestLogger);
  app.use(bodyParser.json());
  app.use(haltOnTimedout);
//  app.use(responseTime);
  app.get('/status', middleware.statusMiddleware);
  var runningMode = process.env['RUNNING_MODE'];
  if (runningMode === 'TEST' || runningMode === 'DEBUG') {
    logHelper.logger.info('Test mode detected : ' + runningMode);
    app.get('/stop', middleware.stopMiddleware);
  }

  app.set('view engine', 'ejs');
  db.connectdb(process.env.MYSQL_WRITE_DATABASE,function(connect){
    connection = connect;
  });
  app.use(express.static(path.join(__dirname, '/../../public')));
  app.get("/", function(req, res){
      res.redirect("/hello");
  });
  var adresses = utils.getip();
  console.log(adresses);
  app.get('/helloworld', function (req, res, next) {
    try{
      res.send('Hello World!');
    } catch(ex){
      next(ex);
    }
  });

  app.post('/helloworld', function (req, res, next) {
    try{
      res.send('World Hello!');
    } catch(ex){
      next(ex);
    }
  });
  app.get('/hello', function(req, res) {
    res.render(path.join(__dirname + '/../../public/index'), {
      tagline: process.version,
      env: process.env,
      moduleversion: pckjson.version,
      adresses : adresses
    });
    logHelper.logger.info('Hello page loaded successfully !');
  });

  app.get('/database', function(req, res) {
    res.render(path.join(__dirname + '/../../public/database'), {
      status: connection.state,
      result: "",
      query: "select * from hello",
      time : undefined
    });
    logHelper.logger.info('database page loaded successfully !');

  });

  app.get('/reconnect', function(req, res) {
    connection.end();
  /*  db.connectdb(process.env.MYSQL_WRITE_DATABASE, function(connect){
       connection = connect;
       res.render(path.join(__dirname + '/../../public/database'), {
         status: connection.state,
         result: "",
         query: "select * from hello",
         time : undefined
       });
    });*/
    logHelper.logger.info('reconnection loaded successfully !');
  });

  app.get('/reload', function(req, res) {
    res.sendStatus(200);
    logHelper.logger.info('service reloaded successfully !');
  });

  app.get('/data', function(req, res) {
    connection.query(req["query"]["query"], function(err, result) {
      start = new Date(req['_startTime']);
      timeElapsed = new Date() - start;
      if (err) {
        res.render(path.join(__dirname + '/../../public/database'), {
          status: connection.state,
          result: err,
          query: req["query"]["query"],
          time: timeElapsed
        });
      } else {
        res.render(path.join(__dirname + '/../../public/database'), {
          status: connection.state,
          result: JSON.stringify(result, null, 4),
          query: req["query"]["query"],
          time: timeElapsed
        });
      }
    });
  });

  app.get('/config', function(req, res) {
    var cfiles = utils.getConfigFiles();

      res.render(path.join(__dirname + '/../../public/config'), {
        files: cfiles,
      });

    logHelper.logger.info('config page loaded successfully !');
  });

  helloWorld.registerServer(app, '/helloWorld');

  app.all('*', middleware.notFoundMiddleware);
  app.use(middleware.errorHandler);
  return app;
};

function haltOnTimedout(req, res, next) {
  if (!req.timedout) {
    next();
  }
}

/**
 * Start Server
 * @param port port
 * @param callback callback
 * @returns {http.Server}
 */
var startServer = function(port, callback) {
  var nodeEnv = process.env['NODE_ENV'];
  logHelper.logger.info('Server starting server PID : ' + process.pid + ' , NODE_ENV :' + nodeEnv);

  var server = app.listen(port, function(err) {
    if (err) {
      logHelper.logger.info('Error while starting server : ' + err);
    } else {
      var serverHost = server.address().address;
      var serverPort = server.address().port;
      logHelper.logger.info('Server started on ' + serverHost + ':' + serverPort);
    }
    callback(err);
  });
  return server;
};

/**
 * Register generic listeners
 */
var registerProcessEventListener = function() {

  process.on('uncaughtException', function(err) {
    logHelper.logger.error('Caught exception: ' + err);
    if (err) {
      logHelper.logger.error('Caught exception stack : ' + err.stack);
    }
  });

  process.on('exit', function(code) {
    logHelper.logger.info('Process exit ' + code);
  });
};

module.exports = {
  buildServer: buildServer,
  startServer: startServer,
  registerProcessEventListener: registerProcessEventListener
};
