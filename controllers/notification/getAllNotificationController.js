const {
  getAllNotificationServices,
} = require("../../services/notificationServices");

exports.getAllNotificationController = async (req, res) => {
  try {
    const notification = await getAllNotificationServices();
    if (notification?.length > 0) {
      res.status(200).json({
        status: "success",
        notification: notification,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Unable to get notifications",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
