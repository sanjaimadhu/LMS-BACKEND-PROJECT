const { getAllMonthServices } = require("../../services/monthServices");

exports.getAllMonthController = async (req, res) => {
  try {
    const month = await getAllMonthServices();
    if (month?.length > 0) {
      res.status(200).json({
        status: "success",
        month: month,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Unable to get books",
        month,
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
