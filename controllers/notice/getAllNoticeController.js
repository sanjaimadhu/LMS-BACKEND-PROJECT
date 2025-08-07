const {getAllNoticeServices} = require("../../services/noticeServices");

exports.getAllNoticeController = async (req, res) => {
  try {
    const notice = await getAllNoticeServices();
    if (notice?.length > 0) {
      res.status(200).json({
        status: "success",
        notice: notice,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to get books",
        notice,
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
