const express = require("express");
const {addArticleController} = require("../controllers/article/addArticleController");

const {deleteArticleController} = require("../controllers/article/deleteArticleController");
const {editArticleController} = require("../controllers/article/editArticle");
const {getAllArticleController} = require("../controllers/article/getAllArticleController");
const {getLatestArticles} = require("../controllers/article/getLatestArticles");
const {getPopularArticles} = require("../controllers/article/getPopularArticles");
const {getSingleArticleController} = require("../controllers/article/getSingleArticleController");

const router = express.Router();

router.post("/addArticle", addArticleController);
router.get("/getAllArticle", getAllArticleController);
router.delete("/deleteArticle/:id", deleteArticleController);
router.post("/getSingleArticle/:id", getSingleArticleController);
router.post("/editArticle/:id", editArticleController);
router.get("/latestArticles", getLatestArticles);
router.get("/popularArticles", getPopularArticles);

module.exports = router;
