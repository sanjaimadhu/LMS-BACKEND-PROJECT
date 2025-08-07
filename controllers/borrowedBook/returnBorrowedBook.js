const {findSingleBookServices, updateBookStockServices} = require("../../services/bookServices");
const {returnBorrowedBook, findSingleBorrowedBook} = require("../../services/borrowedBookServices");

exports.returnBorrowedBookController = async (req, res) => {
  try {
    const {id: strId, bookId} = req?.body;
    const book = await findSingleBookServices(bookId, true);
    const borrwedBook = await findSingleBorrowedBook(strId);
    const returnedBook = await returnBorrowedBook(borrwedBook);
    if (returnedBook?.status === "returned") {
      const updateBookStock = await updateBookStockServices({book, state: "return"});
      return res.status(200).json({
        status: "success",
        message: "This Borrowed book is returned successfully...",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Sorry! We are having a trouble..",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
