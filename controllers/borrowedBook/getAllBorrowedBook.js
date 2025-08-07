const {findAllBorrowedBook} = require("../../services/borrowedBookServices");

exports.getAllBorrowedBookController = async (req, res) => {
  try {
    const borrowedBooks = await findAllBorrowedBook();
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
