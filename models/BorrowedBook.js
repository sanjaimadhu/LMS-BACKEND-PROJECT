const mongoose = require("mongoose");

const borrowedBookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bookId: {
    type: Number,
    required: true,
    unique: false,
  },
  category: {
    type: String,
  },
  status: {
    type: String,
    default: "borrowed",
    enum: ["borrowed", "returned"],
  },
  image: {
    type: String,
  },
  borrowerId: {
    type: String,
    required: true,
  },
  borrowerName: {
    type: String,
    required: true,
  },
  borrowedDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
});

const BorrowedBook = mongoose.model("BorrowedBook", borrowedBookSchema);
module.exports = BorrowedBook;
