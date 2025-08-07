const {findBooksBySearch} = require("../../services/bookServices");

exports.getBooksBySearch = async (req, res) => {
  try {
    const {search} = req?.body;
    const books = await findBooksBySearch(search);
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
