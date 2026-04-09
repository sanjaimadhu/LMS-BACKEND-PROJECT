import express from "express";
import {
  borrowedBooks,
  getBorrowedBookForAdmin,
  recordBorrowedBook,
  returnBorrowBook,
  updateFine, // Imported updateFine controller
} from "../controllers/borrowController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to record a new book borrowing (Admin only)
router.post("/record-borrow-book/:id", isAuthenticated, isAuthorized("Admin"), recordBorrowedBook);

// Route for Admin to see all borrowed books by all users
router.get("/borrowed-books-by-users", isAuthenticated, isAuthorized("Admin"), getBorrowedBookForAdmin);

// Route for individual users to see their own borrowed books
router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);

// Route to return a borrowed book (Admin only)
router.put("/return-borrowed-book/:bookId", isAuthenticated, isAuthorized("Admin"), returnBorrowBook);

// --- Route to update fine amount (Admin only) ---
router.put("/update-fine/:id", isAuthenticated, isAuthorized("Admin"), updateFine);

export default router;