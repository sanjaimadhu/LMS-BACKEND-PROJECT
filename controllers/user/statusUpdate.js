const {statusUpdateService, findUserByEmail} = require("../../services/userServices");

exports.statusUpdate = async (req, res) => {
  try {
    const {email, status} = req?.body;
    const user = await findUserByEmail(email);
    if (user?._id) {
      const updateUser = await statusUpdateService(user);
      if (updateUser?.status !== status) {
        res.status(200).json({
          status: "success",
          updateUser,
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "Can't Update Status",
          updateUser,
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "User Doesn't exist",
        updateUser,
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
