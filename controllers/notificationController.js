import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { sendEmail } from "../utlis/sendEmail.js";
import { User } from "../models/userModel.js"; 

// 1. Individual Fine Notification (Email + Dashboard Alert)
export const sendFineNotification = catchAsyncErrors(async (req, res, next) => {
    const { email, userName, bookTitle, fineAmount, userId } = req.body;

    if (!email || !userName || !bookTitle || fineAmount === undefined) {
        return next(new ErrorHandler("Required fields are missing: Email, Name, Book Title, or Fine Amount.", 400));
    }

    if (userId) {
        await User.findByIdAndUpdate(userId, {
            $push: {
                notifications: {
                    // Translated the Tamil message to English here
                    message: `Your penalty of ₹${fineAmount} for the book '${bookTitle}' is pending. Please pay it.`,
                    type: "fine", // Identifier: fine
                    status: "unread",
                    createdAt: new Date()
                }
            }
        });
    }

    const message = `
      <div style="background-color: #f8fafc; padding: 60px 20px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 550px; margin: auto; background-color: #ffffff; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; overflow: hidden;">
          <div style="background-color: #ef4444; height: 8px;"></div>
          <div style="padding: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="font-size: 14px; font-weight: 800; letter-spacing: 3px; color: #64748b; text-transform: uppercase;">Library Authority</span>
            </div>
            <h1 style="color: #0f172a; font-size: 32px; font-weight: 800; line-height: 1.2; margin-bottom: 20px; text-align: center;">
              Action Required: Overdue Notice
            </h1>
            <p style="color: #475569; font-size: 18px; line-height: 1.6; text-align: center;">
              Hello <strong>${userName}</strong>, our records show that a book is past its return date.
            </p>
            <div style="background-color: #f1f5f9; border-radius: 16px; padding: 25px; margin: 35px 0; text-align: center;">
              <p style="color: #64748b; font-size: 13px; font-weight: 600; margin: 0 0 10px 0; text-transform: uppercase;">Borrowed Title</p>
              <h2 style="color: #1e293b; font-size: 24px; font-weight: 700; margin: 0;">"${bookTitle}"</h2>
            </div>
            <div style="text-align: center; padding: 20px 0; border-top: 1px dashed #cbd5e1; border-bottom: 1px dashed #cbd5e1; margin-bottom: 35px;">
               <p style="color: #64748b; font-size: 16px; margin: 0 0 5px 0;">Total Accrued Charges</p>
               <span style="color: #ef4444; font-size: 48px; font-weight: 900; letter-spacing: -1px;">₹${fineAmount}</span>
            </div>
            <div style="padding: 15px; background-color: #fff1f2; border-radius: 12px; border: 1px solid #fecdd3; margin-bottom: 30px;">
              <p style="color: #be123c; font-size: 15px; margin: 0; font-weight: 600; text-align: center;">
                ⚠️ Returning the book immediately will stop further daily fines.
              </p>
            </div>
            <p style="color: #94a3b8; font-size: 14px; text-align: center; line-height: 1.5;">
              If you have already returned this book, please ignore this notice. It may take 24 hours to update your status.
            </p>
          </div>
          <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; font-weight: 600; margin: 0;">
              LMS MAYILADUTHURAI • AUTOMATED SYSTEM
            </p>
          </div>
        </div>
      </div>
    `;

    try {
        await sendEmail({
            email,
            subject: `URGENT: Return Notification for ${bookTitle}`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Notification sent to ${email} and Dashboard!`,
        });
    } catch (error) {
        console.error("Email Error Details:", error);
        return next(new ErrorHandler("Unable to send notification. Technical error occurred.", 500));
    }
});

// 2. Admin Broadcast to ALL Users
export const broadcastMessage = catchAsyncErrors(async (req, res, next) => {
    const { message } = req.body;

    if (!message) {
        return next(new ErrorHandler("Broadcast message content is missing.", 400));
    }

    await User.updateMany(
        {}, 
        { 
            $push: { 
                notifications: {
                    message: message,
                    type: "broadcast", // Identifier: broadcast
                    status: "unread",
                    createdAt: new Date()
                } 
            } 
        }
    );

    res.status(200).json({
        success: true,
        message: "Broadcast sent successfully to all users!",
    });
});

// --- New Function: Get Fine Notifications Only ---
export const getMyFineNotifications = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    
    // Filters for "fine" type notifications only (excluding broadcasts)
    const fineOnly = user.notifications.filter(notif => notif.type === "fine");

    res.status(200).json({
        success: true,
        notifications: fineOnly,
    });
});

// 3. Mark ALL Notifications as Read
export const markAllNotificationsAsRead = catchAsyncErrors(async (req, res, next) => {
    await User.updateOne(
        { _id: req.user._id },
        { 
            $set: { "notifications.$[elem].status": "read" } 
        },
        { 
            arrayFilters: [{ "elem.status": "unread" }] 
        }
    );

    res.status(200).json({
        success: true,
        message: "All notifications marked as read!",
    });
});

// 4. Mark Single Notification as Read
export const markNotificationAsRead = catchAsyncErrors(async (req, res, next) => {
    const { notificationId } = req.params;

    await User.updateOne(
        { _id: req.user._id, "notifications._id": notificationId },
        { 
            $set: { "notifications.$.status": "read" } 
        }
    );

    res.status(200).json({
        success: true,
        message: "Notification marked as read!",
    });
});