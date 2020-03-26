const MONGOOSE = require("mongoose");

const USER_DETAIL_SCHEMA = MONGOOSE.Schema(
  {
    NAME: { type: String, require: true },
    PHONE_NO: { type: Number, require: true },
    PIN: { type: Number, require: true },
    EMAIL: { type: String, require: true },
    ADDRESS: { type: String, require: true },
    CITY_TOWN: { type: String, require: true },
    LANDMARK: { type: String, require: true },
    TYPE: { type: String, require: true }
  },
  { timestamps: true }
);

const USERDETAILS = MONGOOSE.model("userdata", USER_DETAIL_SCHEMA);

exports.create = (userData, callback) => {
  const USERDETAILSS = new USERDETAILS();
  USERDETAILSS.NAME = userData.NAME;
  USERDETAILSS.PHONE_NO = userData.PHONE_NO;
  USERDETAILSS.PIN = userData.PIN;
  USERDETAILSS.EMAIL = userData.EMAIL;
  USERDETAILSS.ADDRESS = userData.ADDRESS;
  USERDETAILSS.CITY_TOWN = userData.CITY_TOWN;
  USERDETAILSS.LANDMARK = userData.LANDMARK;
  USERDETAILSS.TYPE = userData.TYPE;

  USERDETAILSS.save()
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback({ message: "Error While Store Book Details in DataBase" }, null);
    });
};
