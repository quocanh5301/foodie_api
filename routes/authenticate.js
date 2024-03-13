const express = require('express');
const authenticateController = require('../controllers/authenticate');
const router = express.Router();

router.post("/logIn", authenticateController.logIn);
router.post("/refreshToken", authenticateController.refreshToken);
router.post("/logOut", authenticateController.logOut);

module.exports = router;