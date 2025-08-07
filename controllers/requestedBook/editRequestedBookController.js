const {editRequestedBookServices, findSingleRequestedBook} = require("../../services/requestedBookServices");

// update user by email
exports.editRequestedBookController = async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const result = await editRequestedBookServices(id, data);
    console.log(result);
    if (result?.modifiedCount == 1) {
      const book = await findSingleRequestedBook(id);
      return res.status(200).json({
        status: "success",
        message: "Book Successfully updated",
        book: book,
      });
    }
    if (result?.modifiedCount !== 1) {
      return res.status(400).json({
        status: "Fail",
        message: "Book can not updated ",
        book: result,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
