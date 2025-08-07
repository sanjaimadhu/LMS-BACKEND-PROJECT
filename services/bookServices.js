const Book = require("../models/Books");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;

// add new book
exports.addBookServices = async (data) => {
  console.log("services", data);
  const book = await Book.create(data);
  console.log(book);
  await book.save({validateBeforeSave: true});
  console.log(book, "jfdlsdjflsdjf");
  return book;
};
// get top borrowed book
exports.findTopBorrowedBooks = async () => {
  const borrowedBooks = await Book.find({}).sort({totalBorrowed: -1}).limit(5);
  return borrowedBooks;
};

// get top  books
exports.findTopBooks = async () => {
  const books = await Book.find({}).sort({views: -1}).limit(5);
  return books;
};

// // find single book
exports.findSingleBookServices = async (id, edit) => {
  const book = await Book.findOne({bookId: id});
  console.log(book);
  if (!edit) {
    book.views = book?.views + 1; // assuming you have a "views" field in your article schema

    book.save((err, updatedArticle) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }
  return book;
};
//find single book by mongoose id
exports.findSingleBookServicesById = async (id) => {
  const book = await Book.findOne({_id: id});
  return book;
};
// update book
exports.editBookServices = async (id, updatedInfo) => {
  const existingBook = await Book.findOne({_id: id});
  if (existingBook) {
    const result = await Book.updateOne({_id: id}, updatedInfo, {
      runValidators: true,
    });

    return result;
  } else {
    return existingBook;
  }
};
// delete book
exports.deleteBookServices = async (id) => {
  try {
    const book = await Book.deleteOne({_id: id});
    return book;
  } catch (error) {
    console.log(error.message);
  }
};

// // get all book
exports.getAllBooksServices = async () => {
  const books = await Book.find({}).sort({createdAt: -1});
  return books;
};
//updating stock after borrow a book
exports.updateBookStockServices = async ({book, state}) => {
  const stock = book?.totalStock;
  if (stock > 0 && state === "borrow") {
    book.totalStock = stock - 1;
    book.totalBorrowed = book?.totalBorrowed + 1;
    if (stock - 1 === 0) {
      book.status = "Stock Out";
    }
  } else if (state === "return") {
    book.totalStock = stock + 1;
    if (stock + 1 > 0) {
      book.status = "In Stock";
    }
  }
  await book.save({validateBeforeSave: true});
  return book;
};
// get all filtered books
exports.findAllFilteredBook = async ({status, search}) => {
  let books;
  if (status !== "" && search === "") {
    books = await Book.find({status});
  } //
  else if (status === "" && search !== "") {
    books = await Book.find({
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({createdAt: -1});
  } //
  else {
    books = await Book.find({
      status,
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({createdAt: -1});
  }

  return books;
};
//find books by search
exports.findBooksBySearch = async (search) => {
  const books = await Book.find({
    $or: [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        category: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        writer: {
          $regex: search,
          $options: "i",
        },
      },
      {
        publications: {
          $regex: search,
          $options: "i",
        },
      },
    ],
  }).sort({createdAt: -1});
  return books;
};
