const {findSingleBookServices, findSingleBookServicesById} = require("../../services/bookServices");

exports.getSingleBookById = async (req, res) => {
  try {
    const {id} = req?.params;
    // console.log("----req---", req.params, id);
    const book = await findSingleBookServicesById(id);
    if (!book) {
      return res.status(200).json({
        status: "failed",
        message: "can not find book",
      });
    }

    return res.status(200).json({
      status: "success",
      book,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};
