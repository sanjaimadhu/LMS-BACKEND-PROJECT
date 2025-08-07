const { deleteBookServices } = require("../../services/bookServices");

// delete bookmark by Id
exports.deleteBookController = async (req, res) => {
  try {
   
    const {id}=req.params
    console.log("-----id",id);
    const book = await deleteBookServices(id);
    console.log(book);
    if (book?.deletedCount !== 0) {
      return res.status(200).json({
        status: "success",
        message: "Book Successfully deleted",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Book not deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
