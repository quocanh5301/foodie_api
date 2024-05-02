const express = require('express');
const notificationController = require('../controllers/notification');
const router = express.Router();

router.post("/getNotificationOfUser", notificationController.getNotificationOfUser);

module.exports = router;