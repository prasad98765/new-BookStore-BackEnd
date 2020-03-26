const jwt = require("jsonwebtoken");
var secretkey = "secretkey";
var bcrypt = require('bcrypt');

// exports.login = (userdata, callback) => {
//   logindata = {
//     userid: userdata.id
//   };
//   jwt.sign(logindata, secretkey, (err, token) => {
//     if (err) {
//       console.log(false);
//     } else {
//       console.log(token);
//       return callback(null, token);
//     }
//   });
// };

exports.decodepassword = (adminpassword,data,callback) => {
  bcrypt.compare(adminpassword,data.PASSWORD,function(err, res){
    if(!res){
       return callback({ message: "Password is Not Match" })
    }else{
      return callback(null,"congratulations... your login is to be done ")
    }
  })
}
