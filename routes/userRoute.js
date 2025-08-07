const express = require("express");
const {
  createOrRemoveAdmin,
} = require("../controllers/user/createOrRemoveAdmin");
const { deleteUser } = require("../controllers/user/deleteUser");
const { getAllUser } = require("../controllers/user/getAlluser");
const { getFilteredUser } = require("../controllers/user/getFilteredUser");
const { getSingleUser } = require("../controllers/user/getSingleUser");
const { statusUpdate } = require("../controllers/user/statusUpdate");
const { updateUser } = require("../controllers/user/updateUser");
const router = express.Router();
const { userLogin } = require("../controllers/user/userLogin");
const { userSignUp } = require("../controllers/user/userSignUp");

router.post("/addUser", userSignUp);
router.post("/authenticateUser", userLogin);
router.post("/changeAdmin", createOrRemoveAdmin);
router.post("/statusUpdate", statusUpdate);
router.delete("/deleteUser/:email", deleteUser);
router.get("/getSingleUser/:email", getSingleUser);
router.get("/allUsers", getAllUser);
router.post("/filteredUsers", getFilteredUser);
router.post("/updateUser/:email", updateUser);


module.exports = router;
