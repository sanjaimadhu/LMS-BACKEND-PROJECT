const {addUser, findUserByEmail} = require("../../services/userServices");
// const User = require("../models/User");

exports.userSignUp = async (req, res) => {
  try {
    const checkUser = await findUserByEmail(req?.body?.email);
    if (checkUser) {
      return res.status(200).json({
        status: false,
        message: "Email is already taken",
      });
    } else {
      const {name, email, password, role, contactNumber, imageURL, studentId, session, year, term, designation, educationalQualification} = req?.body;
      if (name && email && password) {
        if (role === "student") {
          var data = {
            name,
            email,
            password,
            role,
            contactNumber,
            imageURL,
            studentId,
            session,
            year,
            term,
            designation,
            educationalQualification,
            status: "active",
          };
        } else {
          var data = {
            name,
            email,
            password,
            role,
            contactNumber,
            imageURL,
            studentId,
            session,
            year,
            term,
            designation,
            educationalQualification,
          };
        }

        const user = await addUser(data);
        if (user) {
          console.log(user);
          res.status(200).json({
            status: "success",
            message: "User added Successfully",
            user: user,
          });
        } else {
          res.status(200).json({
            status: "failed",
            message: "Unable to create new user",
          });
        }
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
