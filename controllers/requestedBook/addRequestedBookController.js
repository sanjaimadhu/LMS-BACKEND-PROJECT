const {
  addRequestedBookServices,
} = require("../../services/requestedBookServices");

exports.addRequestedBookController = async (req, res) => {
  try {
    const data = req?.body;

    const book = await addRequestedBookServices(data);
    console.log("book---->", req.body);
    if (book) {
      res.status(200).json({
        status: "success",
        message: "Requested Book added Successfully",
        book: book,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to add requested book",
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
