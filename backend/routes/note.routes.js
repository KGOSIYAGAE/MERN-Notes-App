const express = require("express");
const { requireAuth } = require("../utilities");
const { addNewNote, editNote } = require("../controllers/notes.controller");

const router = express.Router();

//Authentication Middleware call
router.use(requireAuth);

//Create new note
router.post("/add-note", addNewNote);

//Edit note
router.put("/edit-note/:noteId", editNote);
module.exports = router;
