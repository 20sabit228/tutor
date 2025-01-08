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
    const db1 = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', // Replace with your MySQL password
        database: 'login_app'
    });

    // Connect to the database
    db1.connect((err) => {
        if (err) {
            console.error('Database connection failed:', err.message);
            return;
        }
        console.log('Connected to the MySQL database');
    });
    //fetch couses
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
    //get course content
    app.get('/get-courses', (req, res) => {
        const query = `
            SELECT c.title AS course_name, cc.youtube_link, cc.drive_link, cc.google_form_link 
            FROM courses c 
            JOIN coursec cc ON c.title = cc.course_name`;
    
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching courses:', err.message);
                res.status(500).send('Failed to fetch courses.');
                return;
            }
            res.json(results); // Send the results as JSON to the frontend
        });
    });
    // Express route for fetching student payments
    //course check payment
    app.get('/api/payments', (req, res) => {
        const { username } = req.query;
        // Query the payment table to get all courses the student has enrolled in
        db.query('SELECT * FROM payment WHERE username = ?', [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result); // Return all the student's enrollments
        });
    });
    
    // Route to add a new course
    app.post('/add-course', (req, res) => {
        console.log('Received data:', req.body);
        const { title, description, rating, price, instructor, playlist, material, exam } = req.body;

    // Insert into 'course' table
        const courseQuery = `INSERT INTO courses (title, description, rating, price, instructor) 
                        VALUES (?, ?, ?, ?, ?)`;
        const coursecQuery = `INSERT INTO coursec (course_name, youtube_link, drive_link, google_form_link) 
                        VALUES (?, ?, ?, ?)`;
                        db.query(courseQuery, [title, description, rating, price, instructor], (err, result) => {
                        if (err) {
                            console.error('Error inserting into courses table:', err.message);
                            res.status(500).send('Failed to add course: ' + err.message);
                            return;
                        }
                    
                        db.query(coursecQuery, [title, playlist, material, exam], (err) => {
                            if (err) {
                                console.error('Error inserting into coursec table:', err.message);
                                res.status(500).send('Failed to add course details: ' + err.message);
                                return;
                            }
                    
                            res.send('Course added successfully!');
                        });
                    });
                });    
        

    
    //signup
    app.post("/signup", (req, res) => {
        const { name, email, phone, password, userType } = req.body;

        if (!name || !email || !phone || !password || !userType) {
            return res.status(400).send("All fields are required.");
        }
        const sqlUsers = "INSERT INTO users (username, password) VALUES (?, ?)";
        const sqlUsers2 = "INSERT INTO users2 (username, password) VALUES (?, ?)";
        const sql = "INSERT INTO customers (name, email, phone, password, userType) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [name, email, phone, password, userType], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).send("Failed to insert data.");
            }
           // res.send("Signup successful!");
        });
    if (userType=='student'){
         db1.query(sqlUsers, [name, password], (err, result) => {
        if (err) {
            console.error("Error inserting into users table:", err);
            return res.status(500).send("Failed to insert into users table.");
        }
        res.send("Signup successful!");
    })}
    if (userType=='teacher'){
            db1.query(sqlUsers2, [name, password], (err, result) => {
            if (err) {
                console.error("Error inserting into users table:", err);
                return res.status(500).send("Failed to insert into users table.");
            }})};
            res.send("Signup successful!");
        });
    app.post("/payment", (req, res) => {
            const { courseId, userId, trx, info, type } = req.body;
        
            // Validate data (example)
            if (!courseId || !userId || !trx || !info || !type) {
                return res.status(400).json({ success: false, message: "Invalid data" });
            }
        
            // Insert into the database (example with MySQL)
            const query = 'INSERT INTO payment (course_id, username, trx, info, type) VALUES (?, ?, ?, ?, ?)';
            const values = [courseId, userId, trx, info, type];
        
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: "Database error" });
                }
                
               res.json({ success: true, message: "Payment recorded successfully" });
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
    


// Payment route

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });