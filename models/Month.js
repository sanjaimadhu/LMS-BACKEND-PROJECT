const mongoose = require("mongoose");

const monthSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Month = mongoose.model("Month", monthSchema);
module.exports = Month;
