const {deleteUserService} = require("../../services/userServices");

exports.deleteUser = async (req, res) => {
  try {
    const {email} = req?.params;
    const deletedUser = await deleteUserService(email);
    if (deletedUser?.deletedCount > 0) {
      res.status(200).json({
        status: "success",
        message: "User Deleted Succesfully!",
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Unable to delete user",
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
