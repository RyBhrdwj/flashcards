const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");

router.post("/", admin.login);
router.post("/refresh", admin.refreshToken);

module.exports = router;
