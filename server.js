const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (your HTML, CSS, JS)

// Initialize SQLite database
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create scores table
db.run('CREATE TABLE scores(name TEXT, score INTEGER)', (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Endpoint to get scores
app.get('/getScores', (req, res) => {
    db.all('SELECT name, score FROM scores ORDER BY score DESC LIMIT 10', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// Endpoint to save score
app.post('/saveScore', (req, res) => {
    const { name, score } = req.body;
    db.run('INSERT INTO scores(name, score) VALUES(?, ?)', [name, score], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.sendStatus(200);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
