const {findLatestArticles} = require("../../services/articleServices");

exports.getLatestArticles = async (req, res) => {
  try {
    const articles = await findLatestArticles();
    if (articles?.length > 0) {
      res.status(200).json({
        status: "success",
        articles: articles,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Unable to get articles",
        articles,
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
