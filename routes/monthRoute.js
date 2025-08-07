const express = require("express");
const { addMonthController } = require("../controllers/month/addMonthController");
const { getAllMonthController } = require("../controllers/month/getAllMonthController");
const { deleteNoticeController } = require("../controllers/notice/deleteNoticeController");
const {
  getAllNoticeController,
} = require("../controllers/notice/getAllNoticeController");
const router = express.Router();

router.post("/addMonth", addMonthController);
router.get("/getAllMonth", getAllMonthController);
// router.get("/getAllBooks", getAllBookController);
router.delete("/deleteNotice/:id", deleteNoticeController);
// router.get("/getSingleBook/:id", getSingleBookController);

module.exports = router;
