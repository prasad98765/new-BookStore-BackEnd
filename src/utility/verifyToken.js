var bcrypt = require('bcrypt');
exports.decodepassword = (adminpassword,data,callback) => {
  bcrypt.compare(adminpassword,data.PASSWORD,function(err, res){
    if(!res){
       return callback({ message: "Password is Not Match" })
    }else{
      return callback(null,"congratulations... your login is to be done ")
    }
  })
}
