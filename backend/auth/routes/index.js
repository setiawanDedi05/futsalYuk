const express = require('express')
const router = express.Router()
const authController = require("../controllers")

router.post('/login', authController.getUserByEmail);
router.post('/verify-token', authController.verifyToken);
router.post('/logout', authController.logout)

module.exports = router