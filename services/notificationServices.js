const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const {ObjectId} = mongoose.Types;

// add new notification
exports.addNotificationServices = async (data) => {
  console.log(data);
  const notification = await Notification.create(data);
  await notification.save({validateBeforeSave: true});
  return notification;
};

// // find single notification
exports.findSingleNotificationServices = async (id) => {
  const notification = await Notification.findOne({_id: id});
  console.log(notification);
  return notification;
};
//change notification status
exports.changeStatusNotificationServices = async (id) => {
  const notification = await Notification.findOne({_id: id});
  notification.read = true;
  notification.save((err, updatedData) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  return notification;
};

// delete  notification
exports.deleteNotificationServices = async (id) => {
  try {
    const notification = await Notification.deleteOne({_id: id});
    return notification;
  } catch (error) {
    console.log(error.message);
  }
};

// // get all notification
exports.getAllNotificationServices = async () => {
  const notification = await Notification.find({}).sort({createdAt: -1});
  return notification;
};
//get notification by user id
exports.getNotificationByUserIdServices = async (id) => {
  const notification = await Notification.find({user: id}).sort({createdAt: -1});
  return notification;
};
