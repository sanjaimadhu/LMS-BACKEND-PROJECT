const mongoose = require("mongoose");

const requestedBookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    publications: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    requestCount: {
      type: Number,
      default: 1,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "available"],
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

const RequestedBook = mongoose.model("RequestedBook", requestedBookSchema);
module.exports = RequestedBook;
