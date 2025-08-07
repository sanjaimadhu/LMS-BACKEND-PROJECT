const BorrowedBook = require("../models/BorrowedBook");
const mongoose = require("mongoose");

// add new borrowed book
exports.createBorrowedBook = async (data) => {
  const borrowedBook = await BorrowedBook.create(data);
  await borrowedBook.save();
  return borrowedBook;
};

// // find single borrowed book
exports.findSingleBorrowedBook = async (id) => {
  const borrowedBook = await BorrowedBook.findOne({_id: id});
  // console.log(book);
  return borrowedBook;
};

// delete borrowed book
exports.returnBorrowedBook = async (borrowedBook) => {
  borrowedBook.status = "returned";
  borrowedBook.returnDate = new Date();
  await borrowedBook.save();
  return borrowedBook;
};

// // get all borrowed book
exports.findAllBorrowedBook = async () => {
  const borrowedBooks = await BorrowedBook.find({}).sort({borrowedDate: -1});
  return borrowedBooks;
};
//
//find by borrowed book userid
exports.findBorrowedBookByUserId = async (borrowerId) => {
  const borrowedBooks = await BorrowedBook.find({borrowerId}).sort({borrowedDate: -1});
  return borrowedBooks;
};
// get all filtered borrowed books
exports.findAllFilteredBorrowedBook = async ({status, search, id}) => {
  let books;
  if (status !== "" && search === "" && id === "") {
    books = await BorrowedBook.find({status}).sort({borrowedDate: -1});
  } //
  else if (status === "" && search !== "" && id === "") {
    books = await BorrowedBook.find({
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
          borrowerName: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({borrowedDate: -1});
  } else if (status !== "" && search !== "" && id === "") {
    books = await BorrowedBook.find({
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

        {
          borrowerName: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({borrowedDate: -1});
  } //
  else if (status === "" && search !== "" && id !== "") {
    books = await BorrowedBook.find({
      borrowerId: id,
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
          borrowerName: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({borrowedDate: -1});
  } else if (status !== "" && search === "" && id !== "") {
    books = await BorrowedBook.find({
      borrowerId: id,
      status,
    });
  } else {
    books = await BorrowedBook.find({
      borrowerId: id,
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

        {
          borrowerName: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({borrowedDate: -1});
  }

  return books;
};
