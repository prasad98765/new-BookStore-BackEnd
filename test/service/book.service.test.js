const BOOK_SERVICE = require("../../src/service/book.service");
const BOOK_MODULE = require("../../src/model/book.model");
const USER_SERVICE = require("../../src/service/userInfo.service")
const USER_MODULE = require("../../src/model/userInfo.model")
const CHAI = require("chai");
const EXPECT = CHAI.expect;
const ASSERT = CHAI.assert;
const SINON = require("sinon");

describe("Book Controller", function () {
  it("When Send Book Details Should Return status Code", function () {
    let obj = {
      body: {
        TITLE: "Harry Potter and the Secret Room",
        AUTHOR: "J.K Rowling",
        YEAR: 1996,
        DESCRIPTION: "Mysterious and Magical Story based Novel with great Popularity",
        RATING: 4.2,
        PRICE: 250
      }
    };
    let bookData = obj.body;
    SINON.stub(BOOK_MODULE, "create").yields(null, bookData);
    BOOK_SERVICE.create(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "Error While Storing Book Details..");
      }
      console.log("form service", data);
      ASSERT.equal(data, bookData);
      BOOK_MODULE.create.restore();
    });
  });
});

describe("Books test cases", function () {
  it("When given search by title should return proper Book details", function () {
    let obj = {
      body: {
        TITLE: "Harry Potter and The Secret Room"
      }
    };

    let bookData = obj.body;
    SINON.stub(BOOK_MODULE, "findone").yields(null, bookData);
    BOOK_SERVICE.searchBook(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "Error while Storing User Details..");
      }
      ASSERT.equal(data, bookData);
      BOOK_MODULE.findone.restore();
    })
  })
})

describe("Book testcases", function () {
  it("When given sort by low-high relevance should return proper data", function () {
    let obj = {
      body: [
        {
          TITLE: "Cindrella and the Magical Pumpkin",
          AUTHOR: "Great Granny",
          YEAR: 1997,
          DESCRIPTION: "my favorite one",
          RATING: 4.5,
          PRICE: 300
        }, {
          TITLE: "Annabella comes home",
          AUTHOR: "M.D MAthews",
          YEAR: 1990,
          DESCRIPTION: "The horror and realistic story based novel",
          RATING: 4.1,
          PRICE: 250
        }
      ]
    };

    let books = obj.body;
    SINON.stub(BOOK_MODULE, "sortAllBooksByAscPrice").yields(null, books);
    BOOK_SERVICE.sortAllBooksByDecPrice(books, function (err, data) {
      if (err) {
        ASSERT.equal(err, "Error while Storing User Details..");
      }
      ASSERT.equal(data, books);
      BOOK_MODULE.sortAllBooksByAscPrice.restore();
    })
  })
})

describe("Book testcases", function () {
  it("When given sort by high-low relevance should return proper data", function () {
    let obj = {
      body: [
        {
          TITLE: "Cindrella and the Magical Pumpkin",
          AUTHOR: "Great Granny",
          YEAR: 1997,
          DESCRIPTION: "my favorite one",
          RATING: 4.5,
          PRICE: 300
        }, {
          TITLE: "Annabella comes home",
          AUTHOR: "M.D MAthews",
          YEAR: 1990,
          DESCRIPTION: "The horror and realistic story based novel",
          RATING: 4.1,
          PRICE: 250
        }
      ]
    };

    let books = obj.body;
    SINON.stub(BOOK_MODULE, "sortAllBooksByDecPrice").yields(null, books);
    BOOK_SERVICE.sortAllBooksByDecPrice(books, function (err, data) {
      if (err) {
        ASSERT.equal(err, "Error while Storing User Details..");
      }
      ASSERT.equal(data, books);
      BOOK_MODULE.sortAllBooksByDecPrice.restore();
    })
  })
})

describe("Users testcases", function () {
  it("When given correct user data should Save data", function () {
    let obj = {
      body: {
        "NAME": "nisha",
        "PHONE_NO": 9867854231,
        "PIN": 411015,
        "LOCALITY": "Tingre Nagar",
        "ADDRESS": "Pune",
        "CITY": "Pune",
        "LANDMARK": "Airport Rd"
      }

    };
    let userData = obj.body;
    SINON.stub(USER_MODULE, "create").yields(null, userData);
    USER_SERVICE.userDetails(userData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "Error while Storing User Details..");
      }
      ASSERT.equal(data, userData);
      USER_MODULE.create.restore();
    });
  });
});

describe("Users testcases", function () {
  it("When given wrong user name should return err", function () {
    let obj = {
      body: {
        "NAME": "13476172927302389",
        "PHONE_NO": 9867854231,
        "PIN": 411015,
        "LOCALITY": "Tingre Nagar",
        "ADDRESS": "Pune",
        "CITY": "Pune",
        "LANDMARK": "Airport Rd"
      }

    };
    let userData = obj.body;
    SINON.stub(USER_MODULE, "create").yields(null, userData);
    USER_SERVICE.userDetails(userData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "Invalid User Details..");
        USER_MODULE.create.restore();
      }
    });
  });
});

describe("Users testcases", function () {
  it("when given book title null should return null data and error", function () {
    let obj = {
      body: {
        TITLE: null
      }
    };
    let bookData = obj.body;

    let searchList = {
      body: {
        TITLE: "Hamlet",
        AUTHOR: "Shakesphere",
        YEAR: 1996,
        DESCRIPTION: "Realistic Love Story Between Romeo and Juliet",
        RATING: 3.9,
        PRICE: 310
      }
    };

    SINON.stub(BOOK_MODULE, "searchBook").yields(null, bookData);
    BOOK_SERVICE.searchBook(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.TITLE, searchList.body.TITLE);
      BOOK_MODULE.searchBook.restore();
    });
  });


  it("When given book title empty should return err ", function () {
    let obj = {
      body: {
        TITLE: ""
      }
    };
    let bookData = obj.body;

    let searchList = {
      body: {
        TITLE: "Disney and Me",
        AUTHOR: "Walt Disney",
        YEAR: 1991,
        DESCRIPTION: "This novel is full of Fair Tale and the imaginary World",
        RATING: 3.2,
        PRICE: 350
      }
    };

    SINON.stub(BOOK_MODULE, "searchBook").yields(null, bookData);
    BOOK_SERVICE.searchBook(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.TITLE, searchList.body.TITLE);
      BOOK_MODULE.searchBook.restore();
    });
  });

  it("When given book title when not correct should return incorrect data", function () {
    let obj = {
      body: {
        TITLE: "Room123"
      }
    };
    let bookData = obj.body;

    let searchList = {
      body: {
        TITLE: "Alice in wonderLand",
        AUTHOR: "Noobie wolfs",
        YEAR: 1992,
        DESCRIPTION: "Mysterious novel with lots of Twists ",
        RATING: 3.2,
        PRICE: 290
      }
    };

    SINON.stub(BOOK_MODULE, "searchBook").yields(null, bookData);
    BOOK_SERVICE.searchBook(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.TITLE, searchList.body.TITLE);
      BOOK_MODULE.searchBook.restore();
    });
  });

  it('When given book authror incorrect  should return err', function () {
    let obj = {
      body: {
        AUTHOR: "Disney1223"
      }
    };

    let authorData = obj.body;

    let searchList = {
      body: {
        TITLE: "Hamlet",
        AUTHOR: "Shakesphere",
        YEAR: 1997,
        DESCRIPTION: "Love story",
        RATING: 4.2,
        PRICE: 340
      }
    };
    SINON.stub(BOOK_MODULE, "searchBook").yields(null, authorData);
    BOOK_SERVICE.searchBook(authorData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.AUTHOR, searchList.body.AUTHOR);
      BOOK_MODULE.searchBook.restore();
    });
  });

  it('When given year empty  should return err', function () {
    let obj = {
      body: {
        YEAR: ""
      }
    };

    let authorData = obj.body;

    let searchList = {
      body: {
        TITLE: "Hamlet",
        AUTHOR: "Shakesphere",
        YEAR: 1997,
        DESCRIPTION: "Love story",
        RATING: 4.2,
        PRICE: 340
      }
    };
    SINON.stub(BOOK_MODULE, "create").yields(null, authorData);
    BOOK_SERVICE.create(authorData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.YEAR, searchList.body.YEAR);
      BOOK_MODULE.create.restore();
    });
  });

  it('When given year string should return err', function () {
    let obj = {
      body: {
        YEAR: "adfshxj"
      }
    };

    let authorData = obj.body;

    let searchList = {
      body: {
        TITLE: "Hamlet",
        AUTHOR: "Shakesphere",
        YEAR: 1997,
        DESCRIPTION: "Love story",
        RATING: 4.2,
        PRICE: 340
      }
    };
    SINON.stub(BOOK_MODULE, "create").yields(null, authorData);
    BOOK_SERVICE.create(authorData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.YEAR, searchList.body.YEAR);
      BOOK_MODULE.create.restore();
    });
  });

  it('When given description empty  should return err', function () {
    let obj = {
      body: {
        DESCRIPTION: ""
      }
    };

    let authorData = obj.body;

    let searchList = {
      body: {
        TITLE: "Doremona and Nobitas Tales",
        AUTHOR: "Shinu shizuva",
        YEAR: 1997,
        DESCRIPTION: "Magical Stories",
        RATING: 4.2,
        PRICE: 350
      }
    };
    SINON.stub(BOOK_MODULE, "create").yields(null, authorData);
    BOOK_SERVICE.create(authorData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.DESCRIPTION, searchList.body.D);
      BOOK_MODULE.create.restore();
    });
  });

  it("when given title is NaN should return notEqual", function () {
    let obj = {
      body: {
        AUTHOR: NaN,
      }
    };
    let bookData = obj.body;

    let searchList = {
      body: {
        TITLE: "Abc",
        AUTHOR: "XUZ",
        YEAR: 1996,
        DESCRIPTION: "SFGHJK",
        RATING: 3.2,
        PRICE: 250
      }
    };

    SINON.stub(BOOK_MODULE, "create").yields(null, bookData);
    BOOK_SERVICE.create(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.AUTHOR, searchList.body.AUTHOR)
      BOOK_MODULE.create.restore();
    })
  });


  it("when given title is undefined should return notEqual", function () {
    let obj = {
      body: {
        TITLE: undefined
      }
    };
    let bookData = obj.body;

    let searchList = {
      body: {
        TITLE: "Abc",
        AUTHOR: "XUZ",
        YEAR: 1996,
        DESCRIPTION: "SFGHJK",
        RATING: 3.2,
        PRICE: 250
      }
    };

    SINON.stub(BOOK_MODULE, "searchBook").yields(null, bookData);
    BOOK_SERVICE.searchBook(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.TITLE, searchList.body.TITLE)
      BOOK_MODULE.searchBook.restore();
    })
  });


  it("when given title not in proper should return notEqual  ", function () {
    let obj = {
      body: {
        TITLE: "/"
      }
    };
    let bookData = obj.body;

    let searchList = {
      body: {
        TITLE: "Abc",
        AUTHOR: "XUZ",
        YEAR: 1996,
        DESCRIPTION: "SFGHJK",
        RATING: 3.2,
        PRICE: 250
      }
    };

    SINON.stub(BOOK_MODULE, "searchBook").yields(null, bookData);
    BOOK_SERVICE.searchBook(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.TITLE, searchList.body.TITLE)
      BOOK_MODULE.searchBook.restore();
    })
  });

  it("when given title not in proper should return notEqual  ", function () {
    let obj = {
      body: {
        TITLE: "ABC"
      }
    };
    let bookData = obj.body;

    let searchList = {
      body: {
        TITLE: "Abc",
        AUTHOR: "XUZ",
        YEAR: 1996,
        DESCRIPTION: "SFGHJK",
        RATING: 3.2,
        PRICE: 250
      }
    };

    SINON.stub(BOOK_MODULE, "searchBook").yields(null, bookData);
    BOOK_SERVICE.searchBook(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err, "error while searching books");
      }
      ASSERT.notEqual(data.TITLE, searchList.body.TITLE)
      BOOK_MODULE.searchBook.restore();
    })
  });

  it("when given Price in not proper should return notEqual  ", function () {
    let obj = {
      body: {
        PRICE: "ABC"
      }
    };
    let bookData = obj.body;

    let searchList = {
      body: {
        TITLE: "Abc",
        AUTHOR: "XUZ",
        YEAR: 1996,
        DESCRIPTION: "SFGHJK",
        RATING: 3.2,
        PRICE: 250
      }
    };

    SINON.stub(BOOK_MODULE, "create").yields(null, bookData);
    BOOK_SERVICE.create(bookData, function (err, data) {
      if (err) {
        ASSERT.equal(err);
      }
      ASSERT.notEqual(data.PRICE, searchList.body.PRICE)
      BOOK_MODULE.create.restore();
    })
  });

});