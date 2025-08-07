const User = require("../models/User");
const crypto = require("crypto");
const dotenv = require("dotenv").config();

exports.isValidPass = async (email, oldPass) => {
  const password =
    process.env.APP_PASS_PREFIX + oldPass + process.env.APP_PASS_SUFFIX;

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await User.findOne({ email });
  // console.log(user,hash,email,oldPass);
  if (user?.email && user?.hashedPassword == hash) {
    return true;
  }
  console.log(user?.hashedPassword, hash);
  return false;
};
