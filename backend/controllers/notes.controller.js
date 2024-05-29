const Note = require("../models/note.model");

//Create new note
const addNewNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const _id = req._id;

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
      userId: _id,
    });

    await note.save();

    res.status(200).json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = { addNewNote };
