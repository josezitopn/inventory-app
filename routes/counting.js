const express = require('express');
const router = express.Router();

let counts = []; // Temporary in-memory storage for counts

// GET all counts
router.get('/', (req, res) => {
    res.json(counts);
});

// POST new count
router.post('/', (req, res) => {
    const { qrCode, itemType, quantity, expiryDate, notes } = req.body;
    const newCount = { id: counts.length + 1, qrCode, itemType, quantity, expiryDate, notes };
    counts.push(newCount);
    res.status(201).json(newCount);
});

// GET count by id
router.get('/:id', (req, res) => {
    const count = counts.find(c => c.id === parseInt(req.params.id));
    if (!count) return res.status(404).send('Count not found.');
    res.json(count);
});

// PUT update count
router.put('/:id', (req, res) => {
    const count = counts.find(c => c.id === parseInt(req.params.id));
    if (!count) return res.status(404).send('Count not found.');

    const { qrCode, itemType, quantity, expiryDate, notes } = req.body;
    count.qrCode = qrCode;
    count.itemType = itemType;
    count.quantity = quantity;
    count.expiryDate = expiryDate;
    count.notes = notes;
    res.json(count);
});

// DELETE count
router.delete('/:id', (req, res) => {
    const countIndex = counts.findIndex(c => c.id === parseInt(req.params.id));
    if (countIndex === -1) return res.status(404).send('Count not found.');
    counts.splice(countIndex, 1);
    res.status(204).send();
});

module.exports = router;