const {getAllArticleServices} = require("../../services/articleServices");

exports.getAllArticleController = async (req, res) => {
  try {
    const article = await getAllArticleServices();
    if (article?.length > 0) {
      res.status(200).json({
        status: "success",
        article: article,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to get articles",
        article,
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
