const USER_INFO_SERVICE = require("../service/userInfo.service");
let response = {};
exports.userDetails = (req, res) => {
  console.log(req.body);
  
  try {
    req.checkBody("NAME").exists();
    req
      .checkBody("PHONE_NO")
      .exists();
    req
      .checkBody("PIN")
      .isNumeric()
      .exists();
    req.checkBody("ADDRESS").exists();
    req.checkBody("EMAIL").exists();
    req.checkBody("CITY_TOWN").exists();
    req.checkBody("LANDMARK").exists();
    req.checkBody("TYPE").exists();
    const error = req.validationErrors();
    if (error) {
      console.log("in validetion error");
      
      Response = {
        success: "validetion false"
      };
      res.status(500).send(Response);
    } else {
      var userObj = {
        NAME: req.body.NAME,
        PHONE_NO: req.body.PHONE_NO,
        PIN: req.body.PIN,
        EMAIL: req.body.EMAIL,
        ADDRESS: req.body.ADDRESS,
        CITY_TOWN: req.body.CITY_TOWN,
        LANDMARK: req.body.LANDMARK,
        TYPE : req.body.TYPE
      };
    }
    console.log(userObj);
    
    USER_INFO_SERVICE.userDetails(userObj, (err, data) => {
      if (err) {
        response = {
          success: "false",
          message: err
        };
        res.status(500).send(response);
      } else {
        response = {
          success: "true",
          message: "successfully Details given",
          data: data
        };
        res.status(200).send(response);
      }
    });
  } catch (err) {
    res.status(500).send({ message: "error while storing data" });
  }
};

exports.sendMail = (req,res) =>{
  var books = []
  var obj = {
    EMAIL : req.body.EMAIL,
    ID:req.body.ID,
    Name : req.body.Name,
    Address : req.body.Address,
    Books : req.body.Books
  }
  USER_INFO_SERVICE.sendMail(obj,(err,data)=>{
    if (err) {
      Response = {
        success: "validetion false"
      };
      res.status(500).send(Response);
    }
    res.send(data)
  })
}
