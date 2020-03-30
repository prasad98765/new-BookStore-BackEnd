const USER_INFO_MODULE = require("../model/userInfo.model");
var nodemailer = require("nodemailer");
exports.userDetails = (obj, callback) => {
  USER_INFO_MODULE.create(obj, (err, data) => {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};
exports.sendMail = (data, callback) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    secure:true,
    port:465,
    auth: {
      user: "dabhade904@gmail.com",
      pass: 'sachinD9765@'
    }
  });

  var mailOptions = {
    from: "dabhade904@gmail.com",
    to: data.EMAIL,
    subject: "order placed........",
    text:"Dear " + data.Name + " Thank you for ordering " + data.Books + " Book So that Your order has been placed successfully.Your order will arrive in 3-5 days on your address " + data.Address + " with shipping id will " + data.ID 
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email send");
    }
  });
  callback(null,"send mail")
};

