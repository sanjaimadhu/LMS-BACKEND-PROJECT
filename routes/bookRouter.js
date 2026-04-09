import express from "express";
import { 
    isAuthenticated, 
    isAuthorized 
} from "../middlewares/authMiddleware.js";

import { 
    addBook, 
    deleteBook, 
    getAllBooks, 
    updateBook, 
    createBookReview, 
    deleteReview, 
    getBookReviews, 
    reserveBook, 
    getMyReservedBooks,
    returnBook,
    cancelReservation, 
    getAllReservations,
    deleteReservation 
} from "../controllers/bookController.js";

const router = express.Router();

/**
 * ==========================================
 * ADMIN ROUTES
 * ==========================================
 */

// Puthiya book-ai catalog-la add panna
router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addBook);

// Irukkura book-ai details update panna
router.put("/update/:id", isAuthenticated, isAuthorized("Admin"), updateBook);

// Book-ai inventory-la irunthu permanent-ah delete panna
router.delete("/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteBook);

// Admin ella book reviews-aiyum check panna
router.get("/reviews", isAuthenticated, isAuthorized("Admin"), getBookReviews);

// Thappana reviews-ai admin delete panna
router.delete("/reviews/delete", isAuthenticated, isAuthorized("Admin"), deleteReview);

// Book-ai user return pannum pothu (Stock update & Notification trigger aagum)
router.put("/return/:id", isAuthenticated, isAuthorized("Admin"), returnBook);

// System-la ulla ella reservations-aiyum admin paarkka
router.get("/admin/reservations", isAuthenticated, isAuthorized("Admin"), getAllReservations);

// Specific reservation-ai admin clear/delete panna
router.delete("/admin/reservation/:id", isAuthenticated, isAuthorized("Admin"), deleteReservation);


/**
 * ==========================================
 * USER ROUTES
 * ==========================================
 */

// Library-la ulla ella book-aiyum user paarkka
router.get("/all", isAuthenticated, getAllBooks);

// Book-kaga review poda (Already review irundha update aagum)
router.put("/review/:id", isAuthenticated, createBookReview);

// Stock illatha pothu book-ai reserve panna
router.put("/reserve/:id", isAuthenticated, reserveBook);

// Oru specific user reserve panni vachirukra books-ai mattum paarkka
router.get("/my-reserved-books", isAuthenticated, getMyReservedBooks);

// User thaan reserve panna book-ai cancellation panna
router.put("/cancel-reservation/:id", isAuthenticated, cancelReservation);


export default router;