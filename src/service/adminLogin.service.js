const ADMIN_LOGIN_MODULE = require("../../src/model/adminLogin.model");

exports.create = (data, callback) => {
  console.log("In service===>", data);
  ADMIN_LOGIN_MODULE.create(data, function(err, data) {
    if (err) {
      return callback(err);
    }
    console.log("SERVICE RES", data);
    return callback(null, data);
  });
};

exports.login = (data, callback) => {
  ADMIN_LOGIN_MODULE.login(data, function(err, data) {
    if (err) {
      return callback(err);
    }
    console.log("SERVICE RES", data);
    return callback(null, data);
  });
};

