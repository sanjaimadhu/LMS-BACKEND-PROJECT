const {findSingleRequestedBook, requestCountUpdate} = require("../../services/requestedBookServices");

exports.increaseRequestCount = async (req, res) => {
  try {
    const {id} = req?.body;
    const book = await findSingleRequestedBook(id);
    if (book?._id) {
      const updatedBook = await requestCountUpdate(book);
      res.status(200).json({
        status: "success",
        updatedBook,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Book doesn't exists",
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
