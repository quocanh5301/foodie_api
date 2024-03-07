const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get("/getProfileImage", userController.getProfileImage);

router.post("/updateProfileImage", upload.single('file'), userController.updateProfileImage);

router.post("/setProfileImage", upload.single('image'), userController.setProfileImage);

router.post("/updateUserData", userController.updateUserData);

router.post("/changeUserPassword", userController.changeUserPassword);

router.post("/setFirebaseToken", userController.setFirebaseToken);

module.exports = router;