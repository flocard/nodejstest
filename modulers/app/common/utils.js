/**
 * Created by serius on 05/08/2015.
 */
var S = require('string');
var global = require('../../global.js');
const fs = require('fs');
var os = require("os");
/**
 * Get node module name (required for config files prefix)
 * @return node js module's name
 */
var getNodeModuleName = function(nodeModuleName) {
  if (nodeModuleName.indexOf('$') > -1) {
    return 'appmaf';
  } else {
    return nodeModuleName;
  }
};

var getConfigFiles = function() {
  var cfiles = [];
    files = [process.env.ERABLE_CONFIG_DIR+"/"+process.env.ERABLE_SERVICE+"rs-config-tech.json",process.env.ERABLE_CONFIG_DIR+"/"+process.env.ERABLE_SERVICE+"rs-logger-config.json"];
       files.forEach(file => {
         var contents = fs.readFileSync(file, 'utf8');
         cfiles.push({
           filepath: file.split('/').pop(),
           data: contents
         })
       });
      return cfiles;
}


/**
 * Format configuration filename using node js module's name prefix
 * @param filename to adapt
 * @return adapted filename
 */
var resolveConfigFilename = function(nodeModuleName,configfile) {
  return getNodeModuleName(nodeModuleName) + '-' + configfile;
};

var xmlCharMap = {
  '>': '&gt;',
  '<': '&lt;',
  '\'': '&apos;',
  '"': '&quot;',
  '&': '&amp;'
};

/**
 * Escape XML characters
 * @param string string to escape
 * @returns {*|{REPLACE, REPLACE_NEGATIVE}|string}
 */
var escapeXML = function(string) {
  return string.replace(/([&"<>'])/g, function(str, item) {
    return xmlCharMap[item];
  });
};

/**
 * Add a relative path to an URL. If path is undefined, the input URL is returned
 * @param url the base url
 * @param path the path to add
 * @return {*}
 */
var addPathToUrl = function(url, path) {
  var newurl = url;
  if (path) {
    if (!S(url).endsWith('/') && !S(path).startsWith('/')) {
      newurl += '/';
    }
    newurl += path;
  }
  return newurl;
};

/**
 * Determine if a variable is empty or not. Undefined variable returns true also.
 * @param str
 * @return {boolean}
 */
var isEmpty = function(str) {
  return !str || 0 === str.length;
};

var getip = function() {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address);
      }
    }
  }
  return addresses;
}

/**
 * Exports
 */
module.exports = {
  getNodeModuleName: getNodeModuleName,
  resolveConfigFilename: resolveConfigFilename,
  escapeXML: escapeXML,
  getip: getip,
  addPathToUrl: addPathToUrl,
  isEmpty: isEmpty,
  getConfigFiles: getConfigFiles
};
