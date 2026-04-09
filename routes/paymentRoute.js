import express from "express";
import { 
  checkout, 
  paymentVerification 
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 1. Checkout Route - Order ID generate panna (User login ayirukanum)
router.post("/checkout", isAuthenticated, checkout);

// 2. Verification Route - Payment mudinja udane signature check panna
router.post("/payment-verification", isAuthenticated, paymentVerification);

export default router;