var erableLogger = require('erable-logger-nodejs');
var path = require('path');
var fs = require('fs');
var utils = require('./utils');
var global = require('../../global.js');

var logger, isDebug = null, isTrace = null, isLoaded = false;
var defaultConfFilePath = path.resolve(process.env['ERABLE_CONFIG_DIR'], utils.resolveConfigFilename(global.pkgJson.name,'logger-config.json'));


/**
 * Load logger if not already done
 */
if (!isLoaded) {
    isLoaded = initLogger();
}

/**
 * initialize erable logger
 * @param confFilePath
 * @returns {boolean}
 */
function initLogger(confFilePath) {
    var filePath = (confFilePath === undefined) ? defaultConfFilePath : confFilePath;
    var loaded = false;

    var emitter = {
        name: 'njstest',
        version: 'test',
        type: 'service'
    };
    var mappingVersion = {
        commonMappingVersion: '1.6',
        customMappingVersion: '1.0'
    };

    try {
        var container = erableLogger.buildLoggerFromFile(filePath, emitter, mappingVersion);
        logger = container.get('erable-logger');
        module.exports.logger = logger;
        loaded = true;
        logger.info('Logger sucessfully loaded, is debug enabled : ' + isDebugEnabled());
    } catch (ex) {
        console.error('Exception while loading logger: ', ex);
    }
    return loaded;
}

/**
 * Reload logger and reset isDebug isTrace values
 * @param confFilePath
 */
var reloadLogger = function (confFilePath) {
    var filePath = (confFilePath === undefined) ? defaultConfFilePath : confFilePath;
    initLogger(filePath);
    isDebug = null;
    isTrace = null;
};

// Info for logging
var projectInfo = require('../../package.json');

/**
 * returns true if debug level is enabled
 * @returns {*}
 */
function isDebugEnabled() {
    if (isDebug === null) {
        isDebug = logger.isLevelEnabled('DEBUG');
    }
    return isDebug;
}

/**
 * returns true if trace level is enabled
 * @returns {*}
 */
function isTraceEnabled() {
    if (isTrace === null) {
        isTrace = logger.isLevelEnabled('TRACE');
    }
    return isTrace;
}

/**
 * returns the metadata including the processId
 */
var getMetaDataWithProcessId = function() {
    var metaData = {};
    erableLogger.logField(metaData, erableLogger.fieldsMapping.technical.thread.id, `${process.pid}`);
    return metaData;
}


/**
 * Logger helper module
 */
module.exports.erableLogger = erableLogger;
module.exports.initLogger = initLogger;
module.exports.reloadLogger = reloadLogger;
module.exports.isDebugEnabled = isDebugEnabled;
module.exports.isTraceEnabled = isTraceEnabled;
module.exports.getMetaDataWithProcessId = getMetaDataWithProcessId;
