const { findSingleUser } = require("../../services/userServices");

exports.getSingleUser = async (req, res) => {
  const { email } = req?.params;
  try {
    const users = await findSingleUser(email);
    if (users) {
      res.status(200).json({
        status: "success",
        users,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Unable to get user",
        users,
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
