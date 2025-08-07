const {getAllArticleServices} = require("../../services/articleServices");
const {getNotificationByUserIdServices} = require("../../services/notificationServices");

exports.getNotificationsByUserId = async (req, res) => {
  try {
    const {id} = req?.params;
    const notification = await getNotificationByUserIdServices(id);
    if (notification?.length > 0) {
      res.status(200).json({
        status: "success",
        notification,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to get notifications",
        notification,
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
