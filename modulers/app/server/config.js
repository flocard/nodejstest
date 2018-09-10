/**
 * Configuration objects
 */

var async = require('async');
var utils = require('../common/utils');
var global = require('../../global.js');

/**
 * Config files enumeration
 */
var EConfigFile = {
    // 'value' is an incremental value for the enum
    // 'filename' this field is the name of configuration file
    // 'schemaFileName' name of configuration file schema
    // 'storageVarName' name of the variable which contains the loaded configuration file
    // 'postLoadingFunction' function called after file loading
    CONF_TECH: {
        value: 0,
        fileName: utils.resolveConfigFilename(global.pkgJson.name,'config-tech.json'),
        schemaFileName: 'config_tech_schema.json',
        storageVarName: 'techConfig'
    }
};

/**
 * Environment variables enumeration
 * @type {string[]}
 */
var EconfigEnvVar = [
    'ERABLE_SERVICE',
    'ERABLE_CONFIG_DIR'
    //  'MYSQL_WRITE_HOST',
    //  'MYSQL_WRITE_PORT',
    //  'MYSQL_WRITE_SCHEMA',
    //  'MYSQL_WRITE_USER',
    //  'MYSQL_WRITE_PASSWORD'
];

/**
 * Get the config tech object
 * @returns {*}
 */
function getConfigTech() {
    return global.config[EConfigFile.CONF_TECH.storageVarName];
}

module.exports = {
    EConfigFile: EConfigFile,
    EconfigEnvVar: EconfigEnvVar,
    getConfigTech: getConfigTech
};