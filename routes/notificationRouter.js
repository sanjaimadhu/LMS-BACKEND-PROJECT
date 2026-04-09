import express from "express";
import { 
    sendFineNotification, 
    broadcastMessage, 
    markAllNotificationsAsRead, 
    markNotificationAsRead, getMyFineNotifications
} from "../controllers/notificationController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// 1. Individual Fine Notification (Admin Only)
router.post("/send-fine", isAuthenticated, isAuthorized("Admin"), sendFineNotification);

// 2. Admin Broadcast to ALL Users (Admin Only)
router.post("/broadcast", isAuthenticated, isAuthorized("Admin"), broadcastMessage);

// 3. Mark ALL Notifications as Read (For Logged-in User)
// இது "New Messages" ஐ "Old Messages" ஆக மாற்றும்
router.put("/mark-all-read", isAuthenticated, markAllNotificationsAsRead);

// 4. Mark Single Notification as Read (For Logged-in User)
// ஒரு குறிப்பிட்ட மெசேஜை மட்டும் Read ஆக மாற்ற
router.put("/mark-read/:notificationId", isAuthenticated, markNotificationAsRead);

router.get("/my-fines", isAuthenticated, getMyFineNotifications);

export default router;