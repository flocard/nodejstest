/**
 * Configuration module
 */
var fs = require('fs');
var path = require('path');
var jsonValidator = require('is-my-json-valid');
var noop = require('node-noop').noop;
var async = require('async');

var logHelper = require('./log');
var config = require('../server/config');

/**
 * Validate all mandatory env variables
 */
var validateEnvVars = function(envVars){
  var missingVars = [];

  for(var i = 0; i < envVars.length; i++){
    if(!process.env[envVars[i]]){
      missingVars.push(envVars[i]);
    }
  }

  return missingVars;
};

/**
 * Validate Configuration file
 * @param {string} erableConfigDir - Configuration directory
 * @param {string} eConfigFile - Configuration file.
 */
var validateConfigFile = function (erableConfigDir, eConfigFile) {
  try {
    var configFile = fs.readFileSync(path.resolve(erableConfigDir, eConfigFile.fileName));

    var configFileContent = JSON.parse(configFile);

    var configFileSchemaContent = require('../schemas/' + eConfigFile.schemaFileName);

    var validatorInstance = jsonValidator(configFileSchemaContent);
    var result = validatorInstance(configFileContent, {
      verbose: true
    });
    return {instance: configFileContent, result: result, errors: validatorInstance.errors };
  } catch (e) {
    logHelper.logger.warn(e.message+'stack : '+ e.stack);
    return {errors: e.message};
  }
};

/**
 * Called when validating a file or a data object
 * @param configFileValidationRes
 * @param configStore
 * @param validationResults
 * @param eConfigObj
 * @param callback
 */
var validateConfigResult = function (configFileValidationRes, configStore, validationResults, eConfigObj, callback) {
  var validatedConfiguration = (configFileValidationRes.result === true);
  validationResults.push(validatedConfiguration);
  if (eConfigObj.fileName) {
    if (validatedConfiguration) {
      logHelper.logger.info('Configuration file %s valid', eConfigObj.storageVarName);
    } else {
      logHelper.logger.fatal('Configuration file %s not valid: %s', eConfigObj.storageVarName,
        JSON.stringify(configFileValidationRes.errors));
    }
  }  else {
    logHelper.logger.warn('Configuration source type for %s unknown', eConfigObj.storageVarName);
  }
  if (validatedConfiguration && configFileValidationRes.instance) {
    // when no data, do not post process them
    configStore[eConfigObj.storageVarName] = configFileValidationRes.instance;
    if (eConfigObj.postLoadingFunction) {
      // execute postLoadingFunction only if it was defined
      var preparedPostLoadingFunction = eConfigObj.postLoadingFunction.bind(eConfigObj.postLoadingFunction.caller,
        configStore[eConfigObj.storageVarName], function (err) {
          if (err) {
            logHelper.logger.info(err);
          }
          callback(err);
        });
      preparedPostLoadingFunction.call(eConfigObj.postLoadingFunction.caller, configFileValidationRes.instance,
        function (err) {
          if (err) {
            logHelper.logger.info(err);
          }
          callback(err);
        });
    } else {
      callback();
    }
  } else {
    callback();
  }

};


/**
 * Iterator whitch is use by async for configuration validation process
 * @param {map} configStore - variable to store configuration content.
 * @param {string} erableConfigDir - Configuration file directory.
 * @param {array} validationResults - store configuration validation results
 * @param {object} err - validations and callback errors.
 * @param {object} callback - Callback function.
 */
var validateConfigIterator = function (configStore, erableConfigDir, validationResults, eConfigObj, callback) {
  var configFileValidationRes;
  if (eConfigObj.fileName) {
    configFileValidationRes = validateConfigFile(erableConfigDir, eConfigObj);
    validateConfigResult(configFileValidationRes, configStore, validationResults, eConfigObj, callback);
  }
};

/**
 * Function which receive results of callback Configuration
 * @param {object} postValidationFn - Callback called at the end of the validation process
 * @param {object} postValidationFnCaller - Represente the fonction whitch will call the postValidation function
 * @param {array} validationResults - store configuration validation results
 * @param {object} err - validations and callback errors.
 */
var validateConfigCallback = function (postValidationFn, postValidationFnCaller, validationResults, err) {
  var validationResultTmp = true;
  for (var i = 0; i < validationResults.length; i++) {
    validationResultTmp = validationResults[i] && validationResultTmp;
  }

  var missingEnvVars = validateEnvVars(config.EconfigEnvVar);

  if (validationResultTmp && !err && missingEnvVars.length === 0) {
    postValidationFn.call(postValidationFnCaller, null, validationResultTmp);
  } else if (missingEnvVars.length > 0){
    postValidationFn.call(postValidationFnCaller,
      'Post validation action not executed: missing environnement variables: ' + missingEnvVars);
  } else {
    postValidationFn.call(postValidationFnCaller,
      'Post validation action not executed: configuration not valid, or file does not exist: ' + err);
  }
};

/**
 * Validate Configuration
 * @param {object} postValidationFn - Callback called at the end of the validation process
 * @param {object} postValidationFnCaller - Represente the function which will call the postValidation function
 * @param {string} erableConfigDir - Configuration file directory.
 * @param {map} configStore - variable to store configuration content.
 */
var validateConfig = function (postValidationFn, postValidationFnCaller, erableConfigDir, configStore) {
  logHelper.logger.info('Back-end settings loading');
  var versVar = JSON.stringify(process.versions);
  logHelper.logger.info('Node.js versions : ' + versVar);
  var eConfigFileArray = [];
  var validationResults = [];
  for (var configFile in config.EConfigFile) {
    if (config.EConfigFile.hasOwnProperty(configFile)) {
      eConfigFileArray.push(config.EConfigFile[configFile]);
    }
  }
  var valConfItFn = validateConfigIterator.bind(this, configStore, erableConfigDir, validationResults);
  var valConfCallFn = validateConfigCallback.bind(this, postValidationFn, postValidationFnCaller, validationResults);
  async.each(eConfigFileArray, valConfItFn, valConfCallFn);
};

module.exports = {
  validateEnvVars: validateEnvVars,
  validateConfig: validateConfig,
  validateConfigFile: validateConfigFile,
  validateConfigCallback: validateConfigCallback,
  validateConfigIterator: validateConfigIterator
};
