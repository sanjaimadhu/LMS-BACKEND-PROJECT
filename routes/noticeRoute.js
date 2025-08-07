const express = require("express");
const {addNoticeController} = require("../controllers/notice/addNoticeController");
const {deleteNoticeController} = require("../controllers/notice/deleteNoticeController");
const {editNoticeController} = require("../controllers/notice/editNotice");
const {getAllNoticeController} = require("../controllers/notice/getAllNoticeController");
const {getSingleNoticeController} = require("../controllers/notice/getSingleNotice");
const router = express.Router();

router.post("/addNotice", addNoticeController);
router.get("/getAllNotice", getAllNoticeController);
// router.get("/getAllBooks", getAllBookController);
router.delete("/deleteNotice/:id", deleteNoticeController);
router.post("/deleteNotice/:id", deleteNoticeController);
router.post("/editNotice/:id", editNoticeController);
router.get("/getSingleNotice/:id", getSingleNoticeController);

module.exports = router;
