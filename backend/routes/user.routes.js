const express = require("express");
const router = express.Router();
const { requireAuth } = require("../utilities");
const { userSignup, userLogin, getUser } = require("../controllers/user.controller");

//Create Account
router.post("/create-account", userSignup);

//login
router.post("/login", userLogin);

//get user
router.get("/get-user", requireAuth, getUser);

module.exports = router;
