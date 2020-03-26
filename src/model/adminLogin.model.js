const MONGOOSE = require("mongoose");

const ADMINSCHEMA = MONGOOSE.Schema(
  {
    NAME: { type: String, require: true },
    EMAIL: { type: String, require: true },
    PASSWORD: { type:String, require: true },
    MOBILENO: { type: String, require: true }
  },
  { timestamps: true }
);
const SCHEMA_ADMIN_LOGIN = MONGOOSE.model("Admin Login", ADMINSCHEMA);

exports.create = (AdminData, callback) => {
  console.log("in model------>",AdminData);
  
  const ADMINDETAILS = new SCHEMA_ADMIN_LOGIN();
  ADMINDETAILS.NAME = AdminData.NAME;
  ADMINDETAILS.EMAIL = AdminData.EMAIL;
  ADMINDETAILS.PASSWORD = AdminData.PASSWORD;
  ADMINDETAILS.MOBILENO = AdminData.MOBILENO;
  ADMINDETAILS.save()
    .then(data => {
      console.log("in Book Create Service", data);
      callback(null, data);
    })
    .catch(err => {
      callback(
        { message: "Error While Storeing Book Deatils in DataBase" },
        null
      );
    });
};
exports.login = (data ,callback) =>{
  SCHEMA_ADMIN_LOGIN.findOne(data)
  .then(data => {
    callback(null, data);
  })
  .catch(err => {
    callback({ message: "plzz Enther Valid Email " });
  });
}
