const { deleteNoticeServices } = require("../../services/noticeServices");

// delete bookby Id
exports.deleteNoticeController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("-----id", id);
    const notice = await deleteNoticeServices(id);
    if (notice?.deletedCount !== 0) {
      return res.status(200).json({
        status: "success",
        message: "Notice Successfully deleted",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Notice not deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
