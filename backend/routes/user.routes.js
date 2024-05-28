const express = require("express");
const router = express.Router();
const { userSignup } = require("../controllers/user.controller");

//Create Account
router.post("/create-account", userSignup);

//login
router.post("/login", async (req, res) => {});

module.exports = router;
