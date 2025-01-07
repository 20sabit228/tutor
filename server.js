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
    // Route to add a new course
    app.post('/add-course', (req, res) => {
        const { title, description, rating, price, instructor } = req.body;
    
        // Validate input
        if (!title || !description || rating || !price || !instructor) {
            return res.status(200).json({ success: false, message: "All fields are required." });
        }
    
        const sql = 'INSERT INTO courses (title, description, rating, price, instructor) VALUES (?, ?, ?, ?, ?)';
    
        db.query(sql, [title, description, rating, price, instructor], (err, result) => {
            if (err) {
                console.error("Error inserting course:", err);
                return res.status(400).json({ success: false, message: "Failed to add course." });
            }
            res.send("Course added successfully:"); // Log successful insert
          //  res.json({ success: true, message: "Course added successfully!" });
        });
    });
    // API to get course content by courseid
app.get('/course-content/:courseid', (req, res) => {
    const courseid = req.params.courseid;

    // Validate courseid
    if (!courseid) {
        return res.status(400).json({ success: false, message: "Course ID is required." });
    }

    const sql = `
        SELECT c.title, cc.material, cc.content_type, cc.upload_date
        FROM courses c
        JOIN coursecontent cc ON c.courseid = cc.courseid
        WHERE c.courseid = ?`;

    db.query(sql, [courseid], (err, results) => {
        if (err) {
            console.error("Error fetching course content:", err);
            return res.status(500).json({ success: false, message: "Failed to fetch course content." });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No content found for this course." });
        }

        res.json({ success: true, data: results });
    });
});
// Payment route

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });