const MONGOOSE = require("mongoose");

const BOOKSCHEMA = MONGOOSE.Schema(
  {
    TITLE: { type: String, require: true },
    AUTHOR: { type: String, require: true },
    YEAR: { type: Number, require: true },
    DESCRIPTION: { type: String, require: true },
    PRICE: { type: Number, require: true },
    RATING: { type: Number, require: true },
    NOOFCOUNT: { type: Number, default: 0 },
    IMAGEURL: { type: String }
  },
  { timestamps: true }
);
const SCHEMABOOK = MONGOOSE.model("book", BOOKSCHEMA);

exports.create = (bookData, callback) => {
  const BOOKDETAILS = new SCHEMABOOK();
  BOOKDETAILS.TITLE = bookData.TITLE;
  BOOKDETAILS.AUTHOR = bookData.AUTHOR;
  BOOKDETAILS.YEAR = bookData.YEAR;
  BOOKDETAILS.DESCRIPTION = bookData.DESCRIPTION;
  BOOKDETAILS.PRICE = bookData.PRICE;
  BOOKDETAILS.RATING = bookData.RATING;
  BOOKDETAILS.IMAGEURL = bookData.IMAGEPATH;
  BOOKDETAILS.NOOFCOUNT = bookData.BOOKSCOUNT;

  BOOKDETAILS.save()
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

exports.getAllBooks = (bookData, callback) => {
  SCHEMABOOK.find({})
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(
        { message: "Error While Storeing Book Deatils in DataBase" },
        null
      );
    });
};

exports.searchBook = (bookData, callback) => {
  SCHEMABOOK.find(
    { TITLE: { $regex: bookData.TITLE, $options: "i" } },
    (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    }
  );
};

exports.sortAllBooksByDecPrice = (data, callback) => {
  SCHEMABOOK.find({})
    .sort({ PRICE: 1 })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback({ message: "Error While Storing Book Details in DataBase" });
    });
};

exports.sortAllBooksByAscPrice = (data, callback) => {
  SCHEMABOOK.find({})
    .sort({ PRICE: -1 })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback({ message: "Error While Storing Book Details in DataBase" });
    });
};

exports.sortAllBooksByNewArrival = (data, callback) => {
  SCHEMABOOK.find({})
    .sort({ YEAR: -1 })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback({ message: "Error While Storing Book Details in DataBase" });
    });
};

exports.findone = (data, callback) => {
  console.log("in findone Function Modukle", data.TITLE);
  SCHEMABOOK.findOneAndUpdate(
    data.TITLE,
    { $inc: { NOOFCOUNT: data.COUNT } },
    (err, data) => {
      if (err) {
        return callback(false);
      }
      console.log("find data=========>", data);
      return callback(null, true);
    }
  );
};

exports.getCount = (bookData, callback) => {
  SCHEMABOOK.find({})
    .then(data => {
      callback(null, data.length);
    })
    .catch(err => {
      callback(
        { message: "Error While Storeing Book Deatils in DataBase" },
        null
      );
    });
};
