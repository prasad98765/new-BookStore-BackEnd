const BOOK_MODULE = require("../../src/model/book.model");
exports.create = (bookData, callback) => {
  BOOK_MODULE.create(bookData, function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};

exports.getAllBooks = (page, callback) => {
  BOOK_MODULE.getAllBooks(page, function(err, data) {
    if (err) {
      callback(err);
    }
    StartLimit = (page - 1) * 12;
    EndLimit = page * 12;
    var books = [];
    for (var i = StartLimit; i < EndLimit; i++) {
      if (data[i] == null) {
        break;
      }
      books.push(data[i]);
    }
    callback(null, books);
  });
};

exports.searchBook = (bookData, callBack) => {
  BOOK_MODULE.searchBook(bookData, (err, data) => {
    if (err) {
      return callBack(err, null);
    } else if (data !== null) {
      return callBack(null, data);
    }
  });
};

exports.updateCount = (data, callBack) => {
  BOOK_MODULE.updateCount(data, (err, data) => {
    if (err) {
      return callBack(err);
    }
    return callBack(null, data);
  });
};

exports.sortAllBooksByDecPrice = (obj, callback) => {
  EndLimit = obj.page * 12;
  StartLimit = (obj.page - 1) * 12;
  var books = [];
  if (obj.SORT == "lowToHigh") {
    BOOK_MODULE.sortAllBooksByDecPrice(obj, (err, data) => {
      if (err) {
        return callback(err);
      }
      for (var i = StartLimit; i < EndLimit; i++) {
        if (data[i] == null) {
          break;
        }
        books.push(data[i]);
      }
      callback(null, books);
    });
  } else if (obj.SORT == "highToLow") {
    BOOK_MODULE.sortAllBooksByAscPrice(obj, (err, data) => {
      if (err) {
        return callback(err);
      }
      for (var i = StartLimit; i < EndLimit; i++) {
        if (data[i] == null) {
          break;
        }
        books.push(data[i]);
      }
      callback(null, books);
    });
  } else if (obj.SORT == "sortArrival") {
    BOOK_MODULE.sortAllBooksByNewArrival(obj, (err, data) => {
      if (err) {
        return callback(err);
      }
      for (var i = StartLimit; i < EndLimit; i++) {
        if (data[i] == null) {
          break;
        }
        books.push(data[i]);
      }
      callback(null, books);
    });
  }
};
exports.findone = (obj, callback) => {
  BOOK_MODULE.findone(obj, (err, data) => {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};
exports.getsortData = (data, page) => {
  StartLimit = (page - 1) * 12;
  EndLimit = page * 12;
  var books = [];
  for (var i = StartLimit; i < EndLimit; i++) {
    if (data[i] == null) {
      break;
    }
    books.push(this.data[i]);
  }
  return books;
};

exports.getCount = (obj, callback) => {
  BOOK_MODULE.getCount(obj, (err, data) => {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};
