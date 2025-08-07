const {editNoticeServices, findSingleNoticeServices} = require("../../services/noticeServices");

exports.editNoticeController = async (req, res) => {
  try {
    const {id} = req?.params;
    const data = req?.body;
    const result = await editNoticeServices(id, data);
    console.log(result);
    if (result?.modifiedCount == 1) {
      const notice = await findSingleNoticeServices(id);
      return res.status(200).json({
        status: "success",
        message: "Book Successfully updated",
        notice: notice,
      });
    }
    if (result?.modifiedCount !== 1) {
      return res.status(400).json({
        status: "Fail",
        message: "Book can not updated ",
        notice: result,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
