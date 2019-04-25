/**
 * Main program
 */
global.config = {};

var logHelper = require('./app/common/log');
var server_ws = require('./app/server/server_ws');
var configManager = require('./app/common/config_manager');
var path = require('path');

var listenPort = process.env['ERABLE_PORTS'];
var configFileDir = path.resolve(process.env['ERABLE_CONFIG_DIR']);


var profileVariable = process.env['MYSQL_READ_USER'];

logHelper.logger.info('Starting server on port : ' + listenPort);

console.info('. profile MYSQL_READ_USER value: ' + profileVariable);

server_ws.registerProcessEventListener();

var callback = function (err) {
  if (err) {
    logHelper.logger.error('Error while starting server: ' + err);
  }
};

configManager.validateConfig(function(err) {
    if (!err) {
      server_ws.buildServer();
      server_ws.startServer(listenPort, callback);
    } else {
      logHelper.logger.warn(err);
    }
  }, server_ws, configFileDir, global.config);
