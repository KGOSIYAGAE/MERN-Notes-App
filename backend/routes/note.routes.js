const express = require("express");
const { requireAuth } = require("../utilities");
const { addNewNote, editNote, getAllNotes, deleteNote, searchNote, updateIsPinned } = require("../controllers/notes.controller");

const router = express.Router();

//Authentication Middleware call
router.use(requireAuth);

//Create new note
router.post("/add-note", addNewNote);

//Edit note
router.put("/edit-note/:noteId", editNote);

//get all notes
router.get("/get-all-notes", getAllNotes);

//delete note
router.delete("/delete-note/:noteId", deleteNote);

//search note
router.get("/search-notes/", searchNote);

//Edit note
router.put("/update-isPinned/:noteId", updateIsPinned);

module.exports = router;
