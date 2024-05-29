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

module.exports = { addNewNote, editNote };
