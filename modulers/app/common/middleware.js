/**
 * Created by acommuni on 29/07/2015.
 */

var logHelper = require('./log');
var resultHelper = require('../server/result');
var extend = require('extend');


/**
 * Set meta data, used
 * @param req http request
 * @param metadata metadata
 */
var setMetadata = function (req, metadata) {
  req._metadata = metadata;
};

/**
 * Get request id
 * @param req http request
 * @returns {*}
 */
var getRequestId = function (req) {
    return req.header('erable-request-id');
  };

/**
 * Get current metadata
 * @param req http request
 * @returns {*}
 */
var getMetadata = function (req) {
  var res = req._metadata;
  if (!res) {
    res = {};
    req._metadata = res;
  }
  return res;
};

/**
 * Get Api
 * @param req http request
 * @returns {*}
 */
var getApi = function (req) {
  return req['_api'];
};

/**
 * Set Api
 * @param req http request
 * @param api current web service Api
 */
var setApi = function (req, api) {
    req['_api'] = api;
};

/**
 * Get UserAgent fields
 * @param req http request
 * @returns {*}
 */
var getUserAgent = function (req) {
  return req['_useragent'];
};

/**
 * Set UserAgent fields
 * @param req http request
 * @param fields UserAgent fields
 */
var setUserAgent = function (req, fields) {
  req['_useragent'] = {
    'appcode': fields[0],
    'os-name': fields[1],
    'app-version': fields[2],
    'manufacturer': fields[3],
    'device': fields[4],
    'os-version': fields[5]
  };
};

/**
 * Send error
 * @param {Object} res res
 * @param {Object} result enum result
 */
var sendResult = function (res, result) {
  res._result = result;
  res.status(result.http_code).send(result.http_body);
};

/**
 * Build error object
 * @param msg error message
 * @param eresult EResult
 * @returns {Error}
 */
var buildError = function (msg, eresult) {
  var res = new Error(msg);
  res.result = eresult;
  return res;
};

/**
 * Build meta data
 * @param req http request
 * @param res http response
 * @returns {{erable-request-id, title, code, duration, remote_ip, user_agent}|*}
 */
var buildMetaData = function (req, res) {
 var metaData = {};
 return metaData;
};

/**
 * Set request logger on app tree in order to generate access log
 * @param req http request
 * @param res http response
 * @param next middleware chain
 */
var requestLogger = function (req, res, next) {
  var sock = req.socket;
  req._startTime = new Date;
  if (sock.socket) {
    req._remoteAddress = sock.socket.remoteAddress;
  }
  else {
    req._remoteAddress = sock.remoteAddress;
  }

  function logRequest() {
    res.removeListener('finish', logRequest);
    res.removeListener('close', logRequest);
    req._stopTime = new Date;
    var metaData = buildMetaData(req, res);
    logHelper.logger.info('Request processed', metaData);
  }

  res.on('finish', logRequest);
  res.on('close', logRequest);

  next();
};

/**
 * Set request logger on app tree in order to generate access log
 * @param req http request
 * @param res http response
 */
var statusMiddleware = function (req, res) {
  setApi(req, 'status');
  res.status(200).send({});
};

/**
 * Middleware used for stopping the server
 * @param req http request
 * @param res http response
 */
var stopMiddleware = function (req, res) {
  setApi(req, 'stop');
  var delay = 5000;
  logHelper.logger.warn('Stopping server from webservice in ' + delay + ' ms');
  res.status(200).send({});
  setTimeout(function () {
      logHelper.logger.warn('Stopping server imminent');
      process.exit(0);
    }, delay
  );

};

/**
 * Build Not found middleware
 * @param req http request
 * @param res http response
 */
var notFoundMiddleware = function (req, res) {
  setApi(req, 'unknown');
  sendResult(res, resultHelper.EResult.NO_SERVICE_FOUND);
};

/**
 * Error handler
 * @param err {Object} error
 * @param req {Object} request
 * @param res {Object} response
 * @param next {Object} next
 * @returns {*}
 */
var errorHandler = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err && err.result) {
    if (err.result.print_stack === undefined || err.result.print_stack) {
      var requestId = getRequestId(req);
      var title = 'Error stack';
      var metaData = buildMetaData(req, res);
      metaData.stack = err.stack;
      logHelper.logger.warn('Error stack for req' + err, metaData);
    }

    res._detail = err.message;
    sendResult(res, err.result);
  } else {
    var requestIdElse = getRequestId(req);
    var titleElse = 'Error stack';
    var metaDataElse = buildMetaData(req, res);
    metaDataElse.stack = err.stack;
    logHelper.logger.error('Unexpected error stack' + err, metaDataElse);
    sendResult(res, resultHelper.EResult.UNEXPECTED_ERROR);
  }
};

/**
 * Timeout handler
 * @param req {Object} request
 * @param res {Object} response
 * @param next {Object} next
 */
var timeoutHandler = function(req, res, next) {
  req.on('timeout', function(){
    next(buildError('Request has timed out', resultHelper.EResult.UNEXPECTED_ERROR));
  });
  next();
};



/**
 * Logge helper module
 */
module.exports = {

  requestLogger: requestLogger,

  setMetadata: setMetadata,

  getMetadata: getMetadata,

  setApi: setApi,

  statusMiddleware: statusMiddleware,

  buildMetaData: buildMetaData,

  errorHandler: errorHandler,

  timeoutHandler: timeoutHandler,

  notFoundMiddleware: notFoundMiddleware,

  sendResult: sendResult,

  buildError: buildError,

  stopMiddleware: stopMiddleware,

  getRequestId: getRequestId,

  setUserAgent: setUserAgent,

  getApi: getApi,

  getUserAgent: getUserAgent

};

