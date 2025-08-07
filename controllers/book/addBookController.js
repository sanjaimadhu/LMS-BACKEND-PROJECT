const {
  addBookServices,
  findSingleBookServices,
} = require("../../services/bookServices");

exports.addBookController = async (req, res) => {
  try {
    const data = req?.body;
    // console.log("book data views",data.views);
    const { bookId } = req?.body;
    // get unique id
    // const existingBook = await findSingleBookServices(bookId);
    // if (existingBook?.bookId) {
    //   return res.status(200).json({
    //     status: "failed",
    //     message: "bookId already available",
    //   });
    // }
    console.log("book---->", req.body);
    const book = await addBookServices(data);
    console.log("book---->", req.body);
    if (book) {
      res.status(200).json({
        status: "success",
        message: "Book added Successfully",
        book: book,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to add new book",
      });
    }
  } catch (error) {
    console.log(error.message,"from add book");
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
