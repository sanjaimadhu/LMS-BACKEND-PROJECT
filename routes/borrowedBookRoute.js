const express = require("express");
const {addBorrowedBookController} = require("../controllers/borrowedBook/addBorrowedBook");
const {getAllBorrowedBookController} = require("../controllers/borrowedBook/getAllBorrowedBook");
const {getBorrowedBookByUserId} = require("../controllers/borrowedBook/getBorrowedBookByUserId");
const {getFilteredBorrowedBooks} = require("../controllers/borrowedBook/getFilteredBorrowedBooks");
const {getSingleBorrowedBookController} = require("../controllers/borrowedBook/getSingleBorrowedBook");
const {getTopBorrowedBooks} = require("../controllers/borrowedBook/getTopBorrowedBook");
const {returnBorrowedBookController} = require("../controllers/borrowedBook/returnBorrowedBook");
const router = express.Router();

router.post("/addBorrowedBook", addBorrowedBookController);
router.get("/getAllBorrowedBooks", getAllBorrowedBookController);
router.get("/getTopBorrowedBooks", getTopBorrowedBooks);
router.get("/getBorrowedBooksByUserId/:id", getBorrowedBookByUserId);
router.post("/returnBook", returnBorrowedBookController);
router.post("/filteredBorrowedBook", getFilteredBorrowedBooks);
router.get("/getSingleBorrowedBook/:id", getSingleBorrowedBookController);
module.exports = router;
