const ADMIN_LOGIN_SERVICE = require("../service/adminLogin.service");
const VERIFY = require("../utility/verifyToken");
var bcrypt = require("bcrypt");
var response = {};
exports.createAdminLogin = (req, res) => {
  try {
    if (!req.body.EMAIL) {
      return res.status(400).send({
        message: "Data is to be Empty"
      });
    }
    req.checkBody("NAME").exists();
    req.checkBody("NAME").exists();
    req.checkBody("MOBILENO").exists();
    req.checkBody("PASSWORD").exists();

    logindata = {
      NAME: req.body.NAME,
      EMAIL: req.body.EMAIL,
      MOBILENO: req.body.MOBILENO,
      PASSWORD: bcrypt.hashSync(req.body.PASSWORD, 10)
    };
    ADMIN_LOGIN_SERVICE.create(logindata, function(err, data) {
      if (err) {
        response = {
          success: false,
          message: err
        };
        res.status(500).send(response);
      }
      response = {
        success: true,
        data: data
      };
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(500).send({ message: "error while storing data" });
  }
};

exports.login = (req, res) => {
  try {
    ADMIN_LOGIN_SERVICE.login({ EMAIL: req.body.EMAIL }, function(err, data) {
      if (err) {
        response = {
          success: false,
          message: "Invalid Email..."
        };
        res.status(500).send(response);
      }
      VERIFY.decodepassword(req.body.PASSWORD, data, (err, data) => {
        if (err) {
          response = {
            data:false
          };
          res.status(500).send(response);
        }else{
        response = {
          data: true
        };
        res.status(200).send(response);
      }
      });
    });
  } catch (err) {
    res.status(500).send({ message: "error while storing data" });
  }
};
