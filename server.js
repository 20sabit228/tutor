const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Allow CORS for frontend requests
app.use(cors());
app.use(bodyParser.json());
// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'tutor'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Route to fetch all courses
app.get('/api/courses', (req, res) => {
    const query = 'SELECT title, description, rating, price, instructor FROM courses';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.post("/signup", (req, res) => {
    const { name, email, phone, password, userType } = req.body;

    if (!name || !email || !phone || !password || !userType) {
        return res.status(400).send("All fields are required.");
    }

    const sql = "INSERT INTO customers (name, email, phone, password, userType) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, phone, password, userType], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Failed to insert data.");
        }
        res.send("Signup successful!");
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});