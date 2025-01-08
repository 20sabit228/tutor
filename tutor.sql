CREATE DATABASE tutor;
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    rating FLOAT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    instructor VARCHAR(255) NOT NULL
);
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    userType ENUM('student', 'teacher') NOT NULL
);
CREATE TABLE payment (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Incremental ID for each payment
    course_id VARCHAR(255) NOT NULL,            -- Foreign key referencing the course ID
    username VARCHAR(255) NOT NULL,    -- Foreign key referencing the username from customers table
    info TEXT,                         -- Additional information about the payment
    trx VARCHAR(255) NOT NULL,         -- Transaction ID
    type ENUM('Bkash', 'Card', 'Bank') NOT NULL, -- Payment type
    approval TINYINT(1) DEFAULT 0,     -- Approval status: 0 (Pending) / 1 (Approved)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of payment creation
);
CREATE TABLE coursec (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    youtube_link VARCHAR(255),
    drive_link VARCHAR(255),
    google_form_link VARCHAR(255),
    google_form_link2 VARCHAR(255)
    progress VARCHAR(255),
);
CREATE TABLE review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_title VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

