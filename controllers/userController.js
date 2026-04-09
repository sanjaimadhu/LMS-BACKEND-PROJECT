import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

// --- UPDATE PROFILE LOGIC ---
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    // 1. Find the current logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    // 2. Prepare update data (Added phone, nic, dob, gender, dept, and role)
    const { name, email, phone, nic, dob, gender, dept, role } = req.body;
    
    const updateData = {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        nic: nic || user.nic,
        dob: dob || user.dob,
        gender: gender || user.gender,
        dept: dept || user.dept,
        role: role || user.role,
    };

    // 3. Photo (Avatar) update logic
    if (req.files && req.files.avatar) {
        const { avatar } = req.files;
        
        // Check file format
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(avatar.mimetype)) {
            return next(new ErrorHandler("File format not supported. Only PNG, JPG and WEBP are allowed.", 400));
        }

        // Delete the old photo from Cloudinary to keep storage clean
        if (user.avatar && user.avatar.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        // Upload the new photo
        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath, 
            {
                folder: "USER_PROFILE_AVATARS", // Cloudinary folder name
            }
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary error:", cloudinaryResponse.error || "Unknown error.");
            return next(new ErrorHandler("Failed to upload avatar to Cloudinary.", 500));
        }

        // Add Cloudinary response details to updateData
        updateData.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    // 4. Finally update the user details in the Database
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        user: updatedUser,
    });
});

// --- GET ALL USERS ---
export const getAllUsers = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find({accountVerified: true});
    res.status(200).json({
        success: true,
        users,
    });
});

// --- REGISTER NEW ADMIN ---
export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
    // ... existing admin registration logic ...
});