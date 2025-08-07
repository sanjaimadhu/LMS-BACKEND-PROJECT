const {findAllBorrowedBook, findBorrowedBookByUserId} = require("../../services/borrowedBookServices");

exports.getBorrowedBookByUserId = async (req, res) => {
  try {
    const {id: borrowerId} = req?.params;
    const borrowedBooks = await findBorrowedBookByUserId(borrowerId);
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
