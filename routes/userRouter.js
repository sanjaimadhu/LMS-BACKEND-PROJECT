import express from "express";
import { 
  getAllUsers, 
  registerNewAdmin, 
  updateProfile // Intha function-ai ippo controller-la ezhutha porom
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);
router.post("/add/new-admin", isAuthenticated, isAuthorized("Admin"), registerNewAdmin);

// Puthiya Route: Profile update panna (Login panni irukanum)
router.put("/update/profile", isAuthenticated, updateProfile);

export default router;