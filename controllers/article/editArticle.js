const {editArticleServices, findSingleArticleServices} = require("../../services/articleServices");

exports.editArticleController = async (req, res) => {
  try {
    const {id} = req?.params;
    const data = req?.body;
    const result = await editArticleServices(id, data);
    console.log(result);
    if (result?.modifiedCount === 1) {
      const article = await findSingleArticleServices(id, true);
      return res.status(200).json({
        status: "success",
        message: "Article Successfully updated",
        article,
      });
    }
    if (result?.modifiedCount !== 1) {
      return res.status(400).json({
        status: "Fail",
        message: "Article can not updated ",
        article: result,
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
