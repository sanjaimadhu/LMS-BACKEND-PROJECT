const { adNoticeServices } = require("../../services/noticeServices");

  exports.addNoticeController = async (req, res) => {
    try {
      const data = req?.body;
  
      const notice = await adNoticeServices(data);
      console.log("notice---->", req.body);
      if (notice) {
        res.status(200).json({
          status: "success",
          message: "notice added Successfully",
          notice: notice,
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "Unable to add notice ",
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
  