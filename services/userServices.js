const User = require("../models/User");
const crypto = require("crypto");
const dotenv = require("dotenv").config();

// create user / signUp user
exports.addUser = async (userInfo) => {
  const user = await User.create(userInfo);
  user.setPassword(userInfo?.password);
  await user.save({validateBeforeSave: true});
  return user;
};
//matching password
exports.validatePassword = (password, user) => {
  return user.validPassword(password);
};

// delete user by email
exports.deleteUserService = async (email) => {
  const user = await User.deleteOne({email});
  return user;
};

// find user by email
exports.findUserByEmail = async (email) => {
  return await User.findOne({email});
};
// find user by email
exports.findSingleUser = async (email) => {
  console.log(email);
  return await User.findOne({email});
};

// get all users
exports.findAllUser = async () => {
  const users = await User.find({}).sort({createdAt: -1});
  return users;
};
// get all filtered users
exports.findAllFilteredUser = async ({role, status, search}) => {
  let users;
  if (status === "" && role === "" && search === "") {
    users = await User.find({}).sort({createdAt: -1});
  } //
  else if (role !== "" && status === "" && search === "") {
    users = await User.find({role}).sort({createdAt: -1});
  } //
  else if (role === "" && status !== "" && search === "") {
    users = await User.find({status}).sort({createdAt: -1});
  } //
  else if (role !== "" && status !== "" && search === "") {
    users = await User.find({role, status}).sort({createdAt: -1});
  } //
  else if (role !== "" && status === "" && search !== "") {
    users = await User.find({
      role,
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          session: {
            $regex: search,
            $options: "i",
          },
        },
        {
          designation: {
            $regex: search,
            $options: "i",
          },
        },
        {
          contactNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({createdAt: -1});
  } //
  else if (role === "" && status !== "" && search !== "") {
    users = await User.find({
      status,
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          session: {
            $regex: search,
            $options: "i",
          },
        },
        {
          designation: {
            $regex: search,
            $options: "i",
          },
        },
        {
          contactNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({createdAt: -1});
  } //
  else if (role === "" && status === "" && search !== "") {
    users = await User.find({
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          session: {
            $regex: search,
            $options: "i",
          },
        },
        {
          designation: {
            $regex: search,
            $options: "i",
          },
        },
        {
          contactNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({createdAt: -1});
  } //
  else {
    users = await User.find({
      role,
      status,
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          session: {
            $regex: search,
            $options: "i",
          },
        },
        {
          designation: {
            $regex: search,
            $options: "i",
          },
        },
        {
          contactNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({createdAt: -1});
  }

  return users;
};
//make  user admin or remove admin
exports.makeOrDeleteAdmin = async (user) => {
  if (user?.admin) {
    user.admin = false;
  } else {
    user.admin = true;
  }
  await user.save({validateBeforeSave: true});
  return user;
};
//user status update
exports.statusUpdateService = async (user) => {
  if (user?.status === "active") {
    user.status = "block";
  } else {
    user.status = "active";
  }
  await user.save({validateBeforeSave: true});
  return user;
};

// update user
exports.updateUser = async (email, updatedInfo) => {
  console.log("updatedinof ---------", updatedInfo);

  const result = await User.findOneAndUpdate({email: email}, updatedInfo, {
    new: true,
    runValidators: true,
  });

  return result;
};
