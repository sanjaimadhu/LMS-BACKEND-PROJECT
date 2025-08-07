const { addArticleServices } = require("../../services/articleServices");

  exports.addArticleController = async (req, res) => {
    try {
      const data = req?.body;
  
      const article = await addArticleServices(data);
      console.log("notice---->", req.body);
      if (article) {
        res.status(200).json({
          status: "success",
          message: "article added Successfully",
          article: article,
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "Unable to add article ",
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
  