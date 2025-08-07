const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    bookId: {
      type: Number,
      required: true,
      unique: true,
    },
    category: {
      type: String,
    },

    description: {
      type: String,
    },
    image: {
      type: String,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    bookLocation: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    publications: {
      type: String,
      required: true,
    },
    edition: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In Stock", "Stock Out"],
      default: "In Stock",
    },
    // borrowedBy: [],
    addedBy: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    totalBorrowed: {
      type: Number,
      default: 0,
    },
    pdfLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
