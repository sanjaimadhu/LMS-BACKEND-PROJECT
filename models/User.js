const mongoose = require("mongoose");
const crypto = require("crypto");
const dotenv = require("dotenv").config();
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide  name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    hashedPassword: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "block"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin","student", "teacher", "stuff"],
      required: [true, "User Role is required"],
      // default: "admin",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    studentId: {
      type: String,
    },
    session: {
      type: String,
    },
    year: {
      type: Number,
    },
    term: {
      type: Number,
    },
    designation: {
      type: String,
    },
    educationalQualification: {
      type: String,
    },
    permanantAddress: {
      type: String,
    },
    currentAddress: {
      type: String,
    },
    experience: {
      type: String,
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },

    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.setPassword = function (userPassword) {
  const password =
    process.env.APP_PASS_PREFIX + userPassword + process.env.APP_PASS_SUFFIX;
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  this.hashedPassword = hash;
};

userSchema.methods.validPassword = function (userPassword) {
  const password =
    process.env.APP_PASS_PREFIX + userPassword + process.env.APP_PASS_SUFFIX;
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return this.hashedPassword === hash;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
