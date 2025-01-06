
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addcourseform');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const rating = 0;
    const price = document.getElementById("price").value;
    const instructor = document.getElementById("instructor").value.trim();
    const errorElement = document.getElementById("error");

    // Clear previous errors
    errorElement.textContent = "";

    // Validate the form data
    if (!title || !description || rating || !price || !instructor) {
        errorElement.textContent = "All fields are required.";
        return;
    }

    const courseData = {
        title,
        description,
        rating,
        price,
        instructor
    };

    fetch('http://localhost:3000/add-course', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add course.");
            }
            return response.text();
        })
        .then((message) => {
            alert(message);
        })
        .catch((error) => {
            console.error("Error:", error);
            errorElement.textContent = "Failed to add course.";
        });
    })});
