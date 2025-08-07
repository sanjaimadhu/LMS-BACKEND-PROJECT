const {findAllFilteredRequestedBook} = require("../../services/requestedBookServices");

exports.getFilteredRequestedBooks = async (req, res) => {
  try {
    const {status, search} = req?.body;
    const books = await findAllFilteredRequestedBook({status, search});
    if (books?.length > 0) {
      res.status(200).json({
        status: "success",
        books,
      });
    } else {
      res.status(200).json({
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
