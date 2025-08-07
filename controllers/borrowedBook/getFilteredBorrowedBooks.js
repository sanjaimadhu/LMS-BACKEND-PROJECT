const {findAllFilteredBorrowedBook} = require("../../services/borrowedBookServices");

exports.getFilteredBorrowedBooks = async (req, res) => {
  try {
    const {status, search, id} = req?.body;
    const borrowedBooks = await findAllFilteredBorrowedBook({status, search, id});
    if (borrowedBooks?.length > 0) {
      res.status(200).json({
        status: "success",
        borrowedBooks,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to get books",
        borrowedBooks,
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
