var log = require('../log');
var parseDbUrl = require("parse-database-url");

exports.connect = function(config, callback) {
  // support full db connection strings as config
  if (typeof config === 'string') {
    config = parseDbUrl(config);
  }

  if (config.driver === undefined) {
    throw new Error('config must include a driver key specifing which driver to use');
  }

  var req = './' + config.driver;
  log.verbose('require:', req);
  var driver = require(req);
  log.verbose('connecting');
  driver.connect(config, function(err, db) {
    if (err) { callback(err); return; }
    log.verbose('connected');
    callback(null, db);
  });
};
