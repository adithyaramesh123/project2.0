const express = require("express");
const router = express.Router();
const Contact = require("../model/Contact");

// POST: Create a new contact message
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;
        const newContact = new Contact({ firstName, lastName, email, phone, message });
        await newContact.save();
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
});

// GET: Fetch all contact messages (Admin)
// Ideally, this should be protected by middleware, but following existing patterns for now.
router.get("/", async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});
// DELETE: Clear all messages
router.delete("/", async (req, res) => {
    try {
        await Contact.deleteMany({});
        res.status(200).json({ message: "All messages deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to clear messages" });
    }
});

// DELETE: Delete a message
router.delete("/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Message deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete message" });
    }
});

module.exports = router;
