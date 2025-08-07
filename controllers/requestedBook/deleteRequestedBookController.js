const { deleteRequestedBookServices } = require("../../services/requestedBookServices");

// delete bookby Id
exports.deleteRequestedBookController = async (req, res) => {
  try {
   
    const {id}=req.params
    console.log("-----id",id);
    const requestedBook = await deleteRequestedBookServices(id);
    console.log(requestedBook);
    if (requestedBook?.deletedCount !== 0) {
      return res.status(200).json({
        status: "success",
        message: "Requested Book Successfully deleted",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Requested Book not deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
