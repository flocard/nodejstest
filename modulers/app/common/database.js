var mysql = require('mysql');
var logHelper = require('./log');

var connectdb = function(url,callback) {
    var connection = mysql.createConnection(url);
    connection.connect(function(err) {
      if (err) {
        logHelper.logger.error('error connecting: ' + err.stack);
      } else {
        logHelper.logger.info('connected as id ' + connection.threadId);
        callback(connection);
      }
    });
}


module.exports = {
  connectdb: connectdb,
};
