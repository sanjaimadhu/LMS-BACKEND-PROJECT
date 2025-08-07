const {findSingleNoticeServices} = require("../../services/noticeServices");

exports.getSingleNoticeController = async (req, res) => {
  try {
    const {id} = req?.params;
    const notice = await findSingleNoticeServices(id);
    if (!notice) {
      return res.status(200).json({
        status: "failed",
        message: "can not find Notice",
      });
    }

    return res.status(200).json({
      status: "success",
      notice,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};
