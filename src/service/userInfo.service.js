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
  console.log("in servie------>",data.BOOKS);
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
    subject: "",
    text:"Dear Customer(or name of the customer Thank you for ordering (book name). Your order has been placed successfully.Your order will arrive in 10-12 days on your address (address of the customer) with shipping id will be" + data.ID
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email send");
    }
  });
  callback(null,"send mail")
};

