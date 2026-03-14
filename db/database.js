const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('./db/inventory.db', (err) => {
    if (err) {
        console.error('Could not connect to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create the Inventory table if it doesn't exist
const createInventoryTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS Inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Could not create table:', err.message);
        } else {
            console.log('Inventory table created or already exists.');
        }
    });
};

createInventoryTable();

// Export the database object for use in other modules
module.exports = db;