var express = require('express');
var router = express.Router();
var dModel = require('../model/Donation');

// Create donation
router.post('/', async (req, res) => {
    try {
        const donation = new dModel(req.body);
        await donation.save();
        res.send("donation added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Error adding donation");
    }
});

// Get all donations
router.get('/donation', async (req, res) => {
    try {
        var data = await dModel.find();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Error fetching donations");
    }
});

// Delete donation
router.delete('/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        await dModel.findByIdAndDelete(req.params.id);
        res.send("Data Deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Error deleting donation");
    }
});

// Update donation
router.put('/update/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        await dModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send("Edited");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Error updating donation");
    }
});

module.exports = router;
