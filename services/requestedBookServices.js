const mongoose = require("mongoose");
const RequestedBook = require("../models/RequestedBook");
const {ObjectId} = mongoose.Types;

// add new requested book
exports.addRequestedBookServices = async (data) => {
  const book = await RequestedBook.create(data);
  await book.save({validateBeforeSave: true});
  return book;
};
//
exports.requestCountUpdate = async (book) => {
  book.requestCount = book?.requestCount + 1;
  await book.save({validateBeforeSave: true});
  return book;
};

// // find single requested book
exports.findSingleRequestedBook = async (id) => {
  const book = await RequestedBook.findOne({_id: id});
  return book;
};

// delete requested book
exports.deleteRequestedBookServices = async (id) => {
  try {
    const book = await RequestedBook.deleteOne({_id: id});
    return book;
  } catch (error) {
    console.log(error.message);
  }
};

// // get all requested book
exports.getAllRequestedBooksServices = async () => {
  const books = await RequestedBook.find({}).sort({createdAt: -1});
  return books;
};

// update requestedbook
exports.editRequestedBookServices = async (id, updatedInfo) => {
  const existingRequested = await RequestedBook.find({_id: id});
  console.log(existingRequested, updatedInfo);
  if (existingRequested) {
    const result = await RequestedBook.updateOne({_id: id}, updatedInfo, {
      runValidators: true,
    });

    return result;
  } else {
    return existingRequested;
  }
};
// get all filtered books
exports.findAllFilteredRequestedBook = async ({status, search}) => {
  let books;
  if (status !== "" && search === "") {
    books = await RequestedBook.find({status}).sort({createdAt: -1});
  } //
  else if (status === "" && search !== "") {
    books = await RequestedBook.find({
      $or: [
        {
          name: {
            $regex: search,
          },
        },
        {
          writer: {
            $regex: search,
          },
        },
        {
          category: {
            $regex: search,
          },
        },

        {
          status: {
            $regex: search,
          },
        },
      ],
    }).sort({createdAt: -1});
  } //
  else {
    books = await RequestedBook.find({
      status,
      $or: [
        {
          name: {
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
          category: {
            $regex: search,
            $options: "i",
          },
        },

        {
          status: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({createdAt: -1});
  }

  return books;
};
// get top requested book
exports.findTopRequestedBooks = async () => {
  const books = await RequestedBook.find({}).sort({requestCount: -1}).limit(5);
  return books;
};
