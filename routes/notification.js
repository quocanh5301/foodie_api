const express = require('express');
const notificationController = require('../controllers/notification');
const router = express.Router();

router.post("/getNotificationOfUser", notificationController.getNotificationOfUser);

router.post("/seenNotification", notificationController.seenNotification);

router.post("/deleteNotification", notificationController.deleteNotification);

module.exports = router;