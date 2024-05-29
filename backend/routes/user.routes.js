const express = require("express");
const router = express.Router();
const { userSignup, userLogin } = require("../controllers/user.controller");

//Create Account
router.post("/create-account", userSignup);

//login
router.post("/login", userLogin);

module.exports = router;
