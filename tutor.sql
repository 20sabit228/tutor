CREATE DATABASE tutor;
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    rating FLOAT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    instructor VARCHAR(255) NOT NULL
);