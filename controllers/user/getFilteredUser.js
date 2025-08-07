const {findAllFilteredUser} = require("../../services/userServices");

exports.getFilteredUser = async (req, res) => {
  try {
    const {role, status, search} = req?.body;
    const users = await findAllFilteredUser({role, status, search});
    if (users?.length > 0) {
      res.status(200).json({
        status: "success",
        users,
      });
    } else {
      res.status(200).json({
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
