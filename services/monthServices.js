const mongoose = require("mongoose");
const Month = require("../models/Month");
const {ObjectId} = mongoose.Types;

// add new month
exports.addMonthServices = async (data) => {
  const month = await Month.create(data);
  await month.save({validateBeforeSave: true});
  return month;
};

// // get all book
exports.getAllMonthServices = async () => {
  const month = await Month.find({}).sort({createdAt: -1});
  return month;
};

// update month count
exports.updateMonthCountServices = async () => {
  const ymonth = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

  const d = new Date();
  let name = ymonth[d.getMonth()];
  const month = await Month.findOne({title: name});
  // update article view count
  month.count++; // assuming you have a "views" field in your article schema

  month.save((err, updatedArticle) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
};
