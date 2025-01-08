document.addEventListener('DOMContentLoaded', function () {
    // Retrieve course title from localStorage
    const courseTitle = localStorage.getItem('coursename');  // Make sure this matches the key used in the first code block
    console.log(courseTitle);
    
    if (courseTitle) {
        // Fetch course details based on the course title
        fetch(`http://localhost:3000/get-course-details?title=${courseTitle}`)
            .then(response => response.json())
            .then(course => {
                // Populate the page with course details
                document.querySelector('h2').textContent = `Course Name: ${course.course_name}`;
                document.querySelector('#youtube-link').href = course.youtube_link;
                document.querySelector('#drive-link').href = course.drive_link;
                document.querySelector('#google-form-link').href = course.google_form_link;
                document.querySelector('#google-form-link2').href = course.google_form_link2;
                document.querySelector('#progress').href = course.progress;
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
                // Handle error (e.g., show an error message)
            });
    } else {
        console.error('Course title not found in localStorage.');
    }
});
