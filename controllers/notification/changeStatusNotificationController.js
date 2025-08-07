const { changeStatusNotificationServices } = require("../../services/notificationServices");

// delete notification by Id
exports.changeStatusNotificationController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("-----id", id);
    const notification = await changeStatusNotificationServices(id);
    if (notification) {
      return res.status(200).json({
        status: "success",
        message: "notification Successfully updated",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "notification not updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
