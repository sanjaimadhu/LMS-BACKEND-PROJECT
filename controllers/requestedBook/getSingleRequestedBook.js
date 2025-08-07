const {findSingleRequestedBook} = require("../../services/requestedBookServices");

exports.getSingleRequestedBookController = async (req, res) => {
  try {
    const {id} = req?.params;

    const book = await findSingleRequestedBook(id);
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
