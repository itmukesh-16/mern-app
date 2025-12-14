const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.text || !req.body.text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    const note = new Note({ text: req.body.text });
    await note.save();

    return res.status(201).json(note); // ✅ always JSON
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

module.exports = router;
