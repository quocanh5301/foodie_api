const express = require('express');
const registerController = require('../controllers/register');
const router = express.Router();

router.post("/registerUser", registerController.registerAccount);
router.use("/confirmRegistration", registerController.confirmEmail);

module.exports = router;