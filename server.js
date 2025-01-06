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
    // Login route
    app.post("/login", (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const query = "SELECT * FROM customers WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Database error." });

            if (results.length === 0) {
                return res.status(401).json({ success: false, message: "Invalid credentials." });
            }

            const user = results[0];
            if (password === user.password) {
                res.json({
                    loggedIn: true,
                    success: true,
                    username: user.name,
                    phone: user.phone,
                    userType: user.userType
                });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials." });
            }
          
        });
    });
    //login check
    app.get("/auth/status", (req, res) => {
        if (req.session && req.session.user) {
            // Example: Check if the session exists and user is authenticated
            res.json({ loggedIn: true });
        } else {
            res.json({ loggedIn: false });
        }
    });
    // Route to add a new course
    app.post('http://localhost:3000/add-course', (req, res) => {
        const { title, description, rating, price, instructor } = req.body;

        // Validate input
        if (!title || !description || !rating || !price || !instructor) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const query = 'INSERT INTO courses (title, description, rating, price, instructor) VALUES (?, ?, ?, ?, ?)';
        
        db.query(query, [title, description, rating, price, instructor], (err, result) => {
            if (err) {
                console.error("Error inserting course:", err);
                return res.status(500).json({ success: false, message: "Failed to add course." });
            }
            res.json({ success: true });
        });
    });
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });