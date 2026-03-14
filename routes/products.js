const express = require('express');
const router = express.Router();

// In-memory product storage (for demonstration purposes)
const products = [];

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// POST a new product
router.post('/', (req, res) => {
    const { barcode, name, price } = req.body;
    if (!barcode || !name || !price) {
        return res.status(400).json({ message: 'Barcode, name, and price are required.' });
    }
    const newProduct = { barcode, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// GET product by barcode
router.get('/:barcode', (req, res) => {
    const product = products.find(p => p.barcode === req.params.barcode);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
});

module.exports = router;