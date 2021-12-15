const express = require("express");
const userControllers = require("../controllers/user.controllers");

const router = express.Router();
router.get("/me", userControllers.me);
router.get("/logout", userControllers.logout);

module.exports = router;
