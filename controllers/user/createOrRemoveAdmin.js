const {findUserByEmail, makeOrDeleteAdmin} = require("../../services/userServices");

exports.createOrRemoveAdmin = async (req, res) => {
  try {
    const {email, admin} = req?.body;
    const user = await findUserByEmail(email);
    if (user?._id) {
      const updateUser = await makeOrDeleteAdmin(user);
      if (updateUser?.admin !== admin) {
        res.status(200).json({
          status: "success",
          updateUser,
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "Can't change admin",
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
