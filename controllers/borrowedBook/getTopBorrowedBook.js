const {findTopBorrowedBooks} = require("../../services/bookServices");

exports.getTopBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await findTopBorrowedBooks();
    if (borrowedBooks?.length > 0) {
      res.status(200).json({
        status: "success",
        borrowedBooks,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Unable to get borrowedBooks",
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
