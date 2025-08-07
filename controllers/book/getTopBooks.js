const {findTopBooks} = require("../../services/bookServices");

exports.getTopBooks = async (req, res) => {
  try {
    const books = await findTopBooks();
    if (books?.length > 0) {
      res.status(200).json({
        status: "success",
        books,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to get borrowedBooks",
        books,
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
