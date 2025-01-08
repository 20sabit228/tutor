document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.course-section');

    fetch('http://localhost:3000/get-courses')
        .then(response => response.json())
        .then(courses => {
            courses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');

                courseCard.innerHTML = `
                    <h2>Course Name: ${course.course_name}</h2>
                    <div class="links">
                        <p><strong>YouTube Link:</strong> <a href="${course.youtube_link}" target="_blank">Watch Video</a></p>
                        <p><strong>Drive Link:</strong> <a href="${course.drive_link}" target="_blank">Access Resources</a></p>
                        <p><strong>Google Form Link:</strong> <a href="${course.google_form_link}" target="_blank">Fill Form</a></p>
                    </div>
                `;

                container.appendChild(courseCard);
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load courses. Please try again later.';
            container.appendChild(errorMessage);
        });
});
