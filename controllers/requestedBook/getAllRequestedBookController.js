
const { getAllRequestedBooksServices } = require("../../services/requestedBookServices");

exports.getAllRequestedBookController = async (req, res) => {
  try {
    const books = await getAllRequestedBooksServices();
    if (books?.length > 0) {
      res.status(200).json({
        status: "success",
        books: books,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Unable to get books",
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
