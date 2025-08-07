const {deleteArticleServices} = require("../../services/articleServices");

// delete bookby Id
exports.deleteArticleController = async (req, res) => {
  try {
    const {id} = req?.params;
    const article = await deleteArticleServices(id);
    if (article?.deletedCount !== 0) {
      return res.status(200).json({
        status: "success",
        message: "article Successfully deleted",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "article can't deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
