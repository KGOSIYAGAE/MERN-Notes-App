const express = require("express");
const { requireAuth } = require("../utilities");
const { addNewNote } = require("../controllers/notes.controller");

const router = express.Router();

//Authentication Middleware call
router.use(requireAuth);

//Create new note
router.post("/getNote", addNewNote);

module.exports = router;
