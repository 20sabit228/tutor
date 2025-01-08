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
    const { title, description, rating, price, instructor, playlist, material, exam1,exam2,progress } = req.body;

// Insert into 'course' table
    const courseQuery = `INSERT INTO courses (title, description, rating, price, instructor) 
                    VALUES (?, ?, ?, ?, ?)`;
    const coursecQuery = `INSERT INTO coursec (course_name, youtube_link, drive_link, google_form_link,google_form_link2,progress) 
                    VALUES (?, ?, ?, ?,?,?)`;
                    db.query(courseQuery, [title, description, rating, price, instructor], (err, result) => {
                    if (err) {
                        console.error('Error inserting into courses table:', err.message);
                        res.status(500).send('Failed to add course: ' + err.message);
                        return;
                    }
                
                    db.query(coursecQuery, [title, playlist, material, exam1,exam2,progress], (err) => {
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
        const { courseId, userId, trx, info, type, price } = req.body;
    
        // Validate data (example)
        if (!courseId || !userId || !trx || !info || !type || !type) {
            return res.status(400).json({ success: false, message: "Invalid data" });
        }
    
        // Insert into the database (example with MySQL)
        const query = 'INSERT INTO payment (course_id, username, trx, info, type,price) VALUES (?, ?, ?, ?, ?,?)';
        const values = [courseId, userId, trx, info, type,price];
    
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
//review
app.post("/api/reviews", (req, res) => {
    const { course_title, review, username } = req.body;
  
    if (!course_title || !review || !username) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    const query = "INSERT INTO review (course_title, review, username, created_at) VALUES (?, ?, ?, NOW())";
    db.query(query, [course_title, review, username], (err, result) => {
      if (err) {
        console.error("Error inserting review into database:", err);
        return res.status(500).json({ error: "Failed to submit review." });
      }
  
      res.json({ message: "Review submitted successfully." });
    });
  });
//show review
app.get("/api/showreviews", (req, res) => {
    const courseTitle = req.query.course_title;
  
    if (!courseTitle) {
      return res.status(400).json({ error: "Course title is required." });
    }
  
    const query = "SELECT * FROM review WHERE course_title = ?";
    db.query(query, [courseTitle], (err, results) => {
      if (err) {
        console.error("Error fetching reviews from database:", err);
        return res.status(500).json({ error: "Failed to fetch reviews." });
      }
  
      res.json(results);
    });
  });
  
//refund
app.post("/api/refunds", (req, res) => {
    const { username, course_title, reason } = req.body;
  
    if (!username || !course_title || !reason) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    const query = "INSERT INTO refund (username, course_title, reason) VALUES (?, ?, ?)";
    db.query(query, [username, course_title, reason], (err, result) => {
      if (err) {
        console.error("Error inserting refund request into database:", err);
        return res.status(500).json({ error: "Failed to submit refund request." });
      }
  
      res.json({ message: "Refund request submitted successfully." });
    });
  });
  

//coursec
app.get('/get-course-details', (req, res) => {
    const { title } = req.query;
    
    if (!title) {
        return res.status(400).send('Course title is required.');
    }

    const query = `
        SELECT c.title AS course_name, cc.youtube_link, cc.drive_link, cc.google_form_link,cc.google_form_link2,cc.progress
        FROM courses c
        JOIN coursec cc ON c.title = cc.course_name
        WHERE c.title = ?`;

    db.query(query, [title], (err, results) => {
        if (err) {
            console.error('Error fetching course details:', err.message);
            res.status(500).send('Failed to fetch course details.');
            return;
        }

        if (results.length === 0) {
            return res.status(404).send('Course not found.');
        }

        res.json(results[0]); // Send the first matching result as JSON
    });
});

// ADMIN DO NOT TOUCH

// Route to fetch all users

// Route to fetch all courses
app.get('/admin/courses', (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error fetching courses', error: err });
      }
      console.log('Fetched courses:', results); // Log the results to check if they are duplicated
      res.json({ success: true, courses: results });
    });
  });
  
  // Route to fetch all users
  app.get('/admin/users', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error fetching users', error: err });
      }
      res.json({ success: true, users: results });
    });
  });
  
  // Route to fetch all payment details
  app.get('/admin/payments', (req, res) => {
    db.query('SELECT * FROM payment', (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error fetching payments', error: err });
      }
      res.json({ success: true, payments: results });
    });
  });
  
  // Route to fetch all refund requests
  app.get('/admin/refunds', (req, res) => {
    db.query('SELECT * FROM refund', (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error fetching refunds', error: err });
      }
      res.json({ success: true, refunds: results });
    });
  });
// drop
// Example for deleting a course
app.delete('/admin/delete-course', async (req, res) => {
    const { id } = req.body;
    try {
      // Assuming you are using SQL (e.g., MySQL)
      await db.query('DELETE FROM courses WHERE id = ?', [id]);
      res.json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ success: false, message: 'Error deleting course' });
    }
  });
  
  // Example for deleting a user
  app.delete('/admin/delete-user', async (req, res) => {
    const { id } = req.body;
    try {
      // Assuming you are using SQL (e.g., MySQL)
      await db.query('DELETE FROM customers WHERE email = ?', [id]);
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Error deleting user' });
    }
  });
  
  // Similar routes for deleting payments and refunds
  // Example for approving a payment
// Example for approving a payment
app.post('/admin/approve-payment', async (req, res) => {
    const { id } = req.body;
    try {
      const result = await db.query('UPDATE payment SET approval = 1 WHERE id = ?', [id]);
  
      if (result.affectedRows > 0) {
        return res.json({ success: true, message: 'Payment approved successfully' });
      } else {
        return res.status(400).json({ success: false, message: 'Payment not found or already approved' });
      }
    } catch (error) {
      console.error('Error approving payment:', error);
      res.status(500).json({ success: false, message: 'Error approving payment' });
    }
  });
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});