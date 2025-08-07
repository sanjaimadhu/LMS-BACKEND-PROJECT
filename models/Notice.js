const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    fileLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;
