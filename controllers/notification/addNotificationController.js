const { addNotificationServices } = require("../../services/notificationServices");

  exports.addNotificationController = async (req, res) => {
    try {
      const data = req?.body;
  
      const notification = await addNotificationServices(data);
      console.log("notification---->", req.body);
      if (notification) {
        res.status(200).json({
          status: "success",
          message: "Notification added Successfully",
          notification: notification,
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "Unable to add notification ",
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
  