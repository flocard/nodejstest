/**
 * Log manager
 * Very poor performance on function isLevelEnabled => so cache of value is needed
 * Configuration cannot be reloaded cause of logger module not neabling this
 * @type {*|exports|module.exports}
 */
var logger = require('erable-logger-nodejs');
var path = require('path');
var fs = require('fs');
var utils = require('./utils');
var global = require('../../global.js');

//isDebugEnabled cache
var isDebugEnabled;

//isDebugEnabled cache
var isTraceEnabled;


/**
 * Loading configuration
 */
var path_config = path.resolve("app/conf", utils.resolveConfigFilename(global.pkgJson.name,'logger-config.json'));
var jsonConf = JSON.parse(fs.readFileSync(path_config)).logging;

logger.loadConfiguration(jsonConf, 'erable-logger', {
  name: global.pkgJson.name,
  version: global.pkgJson.version
}, function (err) {
  /* istanbul ignore if */
  if (err) {
    console.error('Impossible de charger la configuration : ', err);
  } else {
    logger.getLogger('erable-logger');
    isDebugEnabled = logger.isLevelEnabled('DEBUG');
    isTraceEnabled = logger.isLevelEnabled('TRACE');
    logger.info('Logger configuration loading OK : isDebugEnabled:%s,isTraceEnabled:%s,file:%s',
      isDebugEnabled, isTraceEnabled, path_config);
  }
});

/**
 * Logger helper module
 */
module.exports = {
  logger: logger,
  isDebugEnabled: isDebugEnabled,
  isTraceEnabled: isTraceEnabled
};
