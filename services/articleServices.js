const mongoose = require("mongoose");
const Article = require("../models/Article");
const {ObjectId} = mongoose.Types;

// add new article
exports.addArticleServices = async (data) => {
  const article = await Article.create(data);
  await article.save({validateBeforeSave: true});
  return article;
};

// // find single article
exports.findSingleArticleServices = async (id, edit) => {
  const article = await Article.findOne({_id: id});
  if (!edit) {
    // update article view count
    article.views++; // assuming you have a "views" field in your article schema

    article.save((err, updatedArticle) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }

  return article;
};

// delete  article
exports.deleteArticleServices = async (id) => {
  try {
    const article = await Article.deleteOne({_id: id});
    return article;
  } catch (error) {
    console.log(error.message);
  }
};

// // get all articles
exports.getAllArticleServices = async () => {
  const articles = await Article.find({}).sort({createdAt: -1});
  return articles;
};

// // get 4 latest articles
exports.findLatestArticles = async () => {
  const articles = await Article.find({}).sort({createdAt: -1}).limit(4);
  return articles;
};
// // get 4 popular articles
exports.findPopularArticles = async () => {
  const articles = await Article.find({}).sort({views: -1}).limit(4);
  return articles;
};
//edit article
exports.editArticleServices = async (id, updatedInfo) => {
  const existingArticle = await Article.findOne({_id: id});
  console.log(existingArticle, updatedInfo);
  if (existingArticle) {
    const result = await Article.updateOne({_id: id}, updatedInfo, {
      runValidators: true,
    });

    return result;
  } else {
    return existingArticle;
  }
};
