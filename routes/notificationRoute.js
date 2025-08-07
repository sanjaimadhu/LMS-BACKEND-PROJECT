const express = require("express");
const {
  addNotificationController,
} = require("../controllers/notification/addNotificationController");
const {
  changeStatusNotificationController,
} = require("../controllers/notification/changeStatusNotificationController");
const { deleteNotificationController } = require("../controllers/notification/deleteNotificationController");

const {
  getAllNotificationController,
} = require("../controllers/notification/getAllNotificationController");

const router = express.Router();

router.post("/addNotification", addNotificationController);
router.get("/getAllNotification", getAllNotificationController);
router.delete("/deleteNotification/:id", deleteNotificationController);
router.post(
  "/changeNotificationStatus/:id",
  changeStatusNotificationController
);

module.exports = router;
