const jwt = require("jsonwebtoken");
const {findUserByEmail, validatePassword} = require("../../services/userServices");
const dotenv = require("dotenv").config();

exports.userLogin = async (req, res) => {
  try {
    const user = await findUserByEmail(req?.body?.email);
    if (!user) {
      return res.status(200).json({
        status: false,
        message: "User Not Found",
      });
    } else {
      const passwordMatch = validatePassword(req?.body?.password, user);
      if (passwordMatch) {
        var token = jwt.sign({name: user.name, email: user.email}, process.env.JWT_KEY, {
          expiresIn: "8h",
        });
        return res.status(200).json({
          status: true,
          token: token,
          user: user,
        });
      } else {
        return res.status(200).json({
          status: false,
          message: "Incorrect Email/Password",
        });
      }
    }
  } catch (err) {
    console.log("Error in authenticateUser :::::::::::");
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "There was an error occured!",
    });
  }
};
