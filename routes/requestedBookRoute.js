const express = require("express");
const {addRequestedBookController} = require("../controllers/requestedBook/addRequestedBookController");
const {deleteRequestedBookController} = require("../controllers/requestedBook/deleteRequestedBookController");
const {editRequestedBookController} = require("../controllers/requestedBook/editRequestedBookController");
const {getAllRequestedBookController} = require("../controllers/requestedBook/getAllRequestedBookController");
const {getFilteredRequestedBooks} = require("../controllers/requestedBook/getFilteredRequestedBooks");
const {getSingleRequestedBookController} = require("../controllers/requestedBook/getSingleRequestedBook");
const {getTopRequestedBooks} = require("../controllers/requestedBook/getTopRequestedBooks");
const {increaseRequestCount} = require("../controllers/requestedBook/increaseRequestCount");
const router = express.Router();

router.post("/addRequestedBook", addRequestedBookController);
router.get("/getAllRequestedBooks", getAllRequestedBookController);
router.get("/topRequestedBooks", getTopRequestedBooks);
router.get("/getSingleRequestedBook/:id", getSingleRequestedBookController);
router.delete("/deleteRequestedBook/:id", deleteRequestedBookController);
router.post("/editRequestedBook/:id", editRequestedBookController);
router.post("/requesteCount", increaseRequestCount);
router.post("/filteredRequestedBook", getFilteredRequestedBooks);

module.exports = router;
