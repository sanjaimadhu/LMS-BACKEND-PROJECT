const { addMonthServices } = require("../../services/monthServices");

exports.addMonthController = async (req, res) => {
  try {
    const data = req?.body;

    const month = await addMonthServices(data);
    console.log("month---->", req.body);
    if (month) {
      res.status(200).json({
        status: "success",
        message: "month added Successfully",
        month: month,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to add month ",
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
