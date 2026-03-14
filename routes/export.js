const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    try {
        const sampleData = [
            { ID: 1, Barcode: '123456789', QRCode: 'LOC-001', ItemType: 'unit', Quantity: 50, ExpiryDate: '2026-12-31', CountedAt: '2026-03-14' },
            { ID: 2, Barcode: '987654321', QRCode: 'LOC-002', ItemType: 'box', Quantity: 10, ExpiryDate: '2026-06-30', CountedAt: '2026-03-14' }
        ];
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(sampleData);
        worksheet['!cols'] = [
            { wch: 8 },
            { wch: 15 },
            { wch: 15 },
            { wch: 12 },
            { wch: 10 },
            { wch: 15 },
            { wch: 20 }
        ];
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Counts');
        const exportsDir = path.join(__dirname, '..', 'exports');
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `inventory-${timestamp}.xlsx`;
        const filepath = path.join(exportsDir, filename);
        XLSX.writeFile(workbook, filepath);
        res.download(filepath, filename);
    } catch (error) {
        console.error('Error exporting data:', error);
        res.status(500).json({ error: 'Failed to export data', message: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { data, filename = 'inventory-export.xlsx' } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ error: 'Data must be an array' });
        }
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Counts');
        const exportsDir = path.join(__dirname, '..', 'exports');
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir, { recursive: true });
        }
        const filepath = path.join(exportsDir, filename);
        XLSX.writeFile(workbook, filepath);
        res.download(filepath, filename);
    } catch (error) {
        console.error('Error exporting data:', error);
        res.status(500).json({ error: 'Failed to export data', message: error.message });
    }
});

module.exports = router;