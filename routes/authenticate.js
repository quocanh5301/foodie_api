const express = require('express');
const authenticateController = require('../controllers/authenticate');
const router = express.Router();

router.post("/logIn", authenticateController.logIn);
router.get("/refreshToken", authenticateController.refreshToken);
router.get("/logOut", authenticateController.logOut);

module.exports = router;