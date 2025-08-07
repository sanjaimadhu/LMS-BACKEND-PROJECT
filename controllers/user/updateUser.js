const { updateUser, findUserByEmail } = require("../../services/userServices");

// update user by email
exports.updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    // updated user finally
    //  users updated data
    const data = req?.body;
    const user = await updateUser(email, data);
    console.log("user response---->", user);

    if (user) {
      return res.status(200).json({
        status: "success",
        message: "User Successfully updated",
        user,
      });
    }
    if (!user) {
      return res.status(500).json({
        status: "fail",
        message: "user can not updated ",
        user,
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
