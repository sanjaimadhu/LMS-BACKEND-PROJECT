import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        // --- UPDATED ROLE LOGIC (Added Moderator) ---
        role: {
            type: String,
            enum: ["Admin", "User", "Moderator"],
            default: "User",
        },
        // --- ADDED NEW FIELDS (For Profile Update) ---
        phone: {
            type: String,
        },
        nic: {
            type: String,
        },
        dob: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        dept: {
            type: String,
            default: "General",
        },
        accountVerified: { type: Boolean, default: false },
        borrowedBooks: [
            {
                bookId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Borrow",
                },
                returned: {
                    type: Boolean,
                    default: false,
                },
                bookTitle: String,
                borrowedDate: Date,
                dueDate: Date,
            },
        ],
        reservedBooks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            },
        ],
        
        // --- UPDATED NOTIFICATION LOGIC ---
        notifications: [
            {
                message: { type: String, required: true },
                type: { type: String, default: "broadcast" }, // broadcast or fine
                status: { type: String, default: "unread" },  // unread, read, hidden
                createdAt: { type: Date, default: Date.now },
            },
        ],

        avatar: {
            public_id: String,
            url: String,
        },
        verificationCode: Number,
        verificationCodeExpire: Date,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

// Verification Code Generator
userSchema.methods.generateVerificationCode = function () {
    const generateRandomFiveDigitNumber = () => {
        const firstDigit = Math.floor(Math.random() * 9) + 1;
        const remainingDigits = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0");
        return parseInt(firstDigit + remainingDigits);
    };
    const verificationCode = generateRandomFiveDigitNumber();
    this.verificationCode = verificationCode;
    this.verificationCodeExpire = Date.now() + 15 * 60 * 1000;
    return verificationCode;
};

// JWT Token Generator
userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Password Reset Token Generator
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};

export const User = mongoose.model("User", userSchema);