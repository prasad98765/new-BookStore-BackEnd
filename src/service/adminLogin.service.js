const ADMIN_LOGIN_MODULE = require("../../src/model/adminLogin.model");

exports.create = (data, callback) => {
  ADMIN_LOGIN_MODULE.create(data, function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};

exports.login = (data, callback) => {
  ADMIN_LOGIN_MODULE.login(data, function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};

