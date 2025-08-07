const { deleteNotificationServices } = require("../../services/notificationServices");

// delete notification by Id
exports.deleteNotificationController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("-----id", id);
    const notification = await deleteNotificationServices(id);
    if (notification?.deletedCount !== 0) {
      return res.status(200).json({
        status: "success",
        message: "notification Successfully deleted",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "notification not deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
