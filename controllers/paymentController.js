import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { config } from "dotenv";

// Env variables load aaga
config({ path: "./config/config.env" });

// Razorpay Instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// 1. Checkout Function (Order ID create panna)
export const checkout = catchAsyncErrors(async (req, res, next) => {
  // --- CHANGE: req.body-la irundhu amount-ah direct-a Number-a convert panroam ---
  const amount = Number(req.body.amount);

  // Amount check and validation (NaN matrum 0-vukku mela irukanum)
  if (!amount || isNaN(amount) || amount <= 0) {
    return next(new ErrorHandler("Please provide a valid fine amount.", 400));
  }

  const options = {
    amount: Math.round(amount * 100), // Decimal points-ah handle panna Math.round
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// 2. Payment Verification Function
export const paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, noteId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return next(new ErrorHandler("Payment details missing!", 400));
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database update: User current login user-oda ID use panroam
    const user = await User.findById(req.user._id);
    
    if (user && user.notifications) {
      const notification = user.notifications.id(noteId);
      if (notification) {
        notification.status = "read";
      }
      await user.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully!",
    });
  } else {
    return next(new ErrorHandler("Payment verification failed!", 400));
  }
});