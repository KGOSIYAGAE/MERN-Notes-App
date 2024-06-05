const Note = require("../models/note.model");

//Create new note
const addNewNote = async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const userId = req.user._id;

  if (!title) {
    res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    res.status(400).json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      isPinned,
      userId,
    });

    await note.save();

    res.status(200).json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

//Edit note
const editNote = async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const noteId = req.params.noteId;
  const userId = req.user._id;

  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({ error: false, note, message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

//Get all notes
const getAllNotes = async (req, res) => {
  const userId = req.user._id;

  try {
    const notes = await Note.find({ userId }).sort({ isPinned: -1 });
    return res.status(200).json({ error: false, notes, message: "All notes retrieved successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

//Delete note
const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.user._id;

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId, userId });

    return res.status(200).json({ error: false, message: "Noted deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

//Search Notes
const searchNote = async (req, res) => {
  const { _id } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: true, message: "Search query required" });
  }

  try {
    const matchingNotes = await Note.find({ userId: _id, $or: [{ title: { $regex: new RegExp(query, "i") } }, { content: { $regex: new RegExp(query, "i") } }] });

    return res.status(200).json({ error: false, notes: matchingNotes, message: "Notes matching the search query retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

//Update isPinned
const updateIsPinned = async (req, res) => {
  const { isPinned } = req.body;
  const noteId = req.params.noteId;
  const userId = req.user._id;

  try {
    const note = await Note.findOne({ _id: noteId, userId });

    note.isPinned = isPinned;

    await note.save();

    return res.status(200).json({ error: false, note, message: "Note pinned" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

module.exports = { addNewNote, editNote, getAllNotes, deleteNote, searchNote, updateIsPinned };
