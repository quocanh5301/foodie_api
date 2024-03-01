const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get("/retrieveImage", userController.getProfileImage);

router.post("/updateImage", upload.single('file'), userController.updateProfileImage);

router.post("/uploadImage", upload.single('image'), userController.setProfileImage);

router.post("/updateUserData", userController.updateUserData);

router.post("/retrieveUserData", userController.retrieveUserData);
// router.get("/logout", authenticateController.);

module.exports = router;