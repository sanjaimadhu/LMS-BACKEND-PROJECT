const {findAllUser} = require("../../services/userServices");

exports.getAllUser = async (req, res) => {
  try {
    const users = await findAllUser();
    if (users?.length > 0) {
      res.status(200).json({
        status: "success",
        users,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Unable to get users",
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
