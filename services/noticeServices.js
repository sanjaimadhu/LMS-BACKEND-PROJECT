const mongoose = require("mongoose");
const Notice = require("../models/Notice");
const {ObjectId} = mongoose.Types;

// add new notice
exports.adNoticeServices = async (data) => {
  const notice = await Notice.create(data);
  await notice.save({validateBeforeSave: true});
  return notice;
};

// // find single notice
exports.findSingleNoticeServices = async (id) => {
  const notice = await Notice.findOne({_id: id});
  return notice;
};

// delete  notice
exports.deleteNoticeServices = async (id) => {
  try {
    const notice = await Notice.deleteOne({_id: id});
    return notice;
  } catch (error) {
    console.log(error.message);
  }
};

// // get all notice
exports.getAllNoticeServices = async () => {
  const notices = await Notice.find({}).sort({createdAt: -1});
  return notices;
};

// update notice
exports.editNoticeServices = async (id, updatedInfo) => {
  const existingNotice = await Notice.find({_id: id});
  if (existingNotice) {
    const result = await Notice.updateOne({_id: id}, updatedInfo, {
      runValidators: true,
    });

    return result;
  } else {
    return existingNotice;
  }
};
