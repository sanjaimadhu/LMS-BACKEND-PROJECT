const {
  findSingleBookServices,
  updateBookStockServices,
} = require("../../services/bookServices");
const {
  findSingleBorrowedBook,
  createBorrowedBook,
} = require("../../services/borrowedBookServices");
const { updateMonthCountServices } = require("../../services/monthServices");

exports.addBorrowedBookController = async (req, res) => {
  try {
    const data = req?.body;
    const { bookId } = req?.body;
    //
    const book = await findSingleBookServices(bookId);
    const borrowedBook = await createBorrowedBook(data);
    // console.log("book---->", req.body);
    if (borrowedBook) {
      const updateBookStock = await updateBookStockServices({
        book,
        state: "borrow",
      });
      const updateMonthCount = await updateMonthCountServices();
      res.status(200).json({
        status: "success",
        message: "Book Borrowed Successfully",
        borrowedBook: borrowedBook,
      });
    } else {
      res.status(200).json({
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
