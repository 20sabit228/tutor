function fetchCourses() {
  // Get student information
  const studentName = localStorage.getItem("username"); // Assuming student name is stored in localStorage
  const userType = localStorage.getItem('userType');
  
  // Fetch the list of courses
  fetch("http://localhost:3000/api/courses")
    .then((response) => response.json())
    .then((courses) => {
      console.log("Received courses:", courses);
      const container = document.getElementById("coursesContainer");
      container.innerHTML = ""; // Clear container before adding courses

      // Fetch student's course enrollments
      fetch(`http://localhost:3000/api/payments?username=${studentName}`)
        .then((response) => response.json())
        .then((payments) => {
          console.log("Student's payments:", payments);

          // Create course cards
          courses.forEach((course) => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");

            courseCard.innerHTML = `
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <p class='price'>Price: $${course.price}</p>
              <p>Rating: ⭐ ${course.rating}</p>
              <p>Instructor: ${course.instructor}</p>
            `;

            const enterButton = document.createElement("button");
            enterButton.classList.add("enter");
            enterButton.textContent = "Start Your Course";
            enterButton.setAttribute("data-course-id", course.title);

            const enrollButton = document.createElement("button");
            enrollButton.classList.add("enroll");
            enrollButton.textContent = "Enroll Now";
            enrollButton.setAttribute("data-course-id", course.title);

            // Show "Start Your Course" button only if the student has enrolled in this course
            const hasEnrolled = payments.some(payment => payment.course_id === course.title);
            if (hasEnrolled && userType === 'student') {
              enterButton.style.display = 'block';
              enrollButton.style.display='none'
            } else {
              enterButton.style.display = 'none';
            }



            // Hide the enroll button for teachers
            if (userType === 'teacher') {
              enrollButton.style.display = 'none';
            }

            // Attach event listener for "Enroll Now" button
            enrollButton.addEventListener("click", (event) => {
              const courseId = event.target.getAttribute("data-course-id");
              console.log("Enrolling in course:", course.title);
              localStorage.setItem("courseId", courseId);

              const courseIdFromLocalStorage = localStorage.getItem("courseId");
              console.log(courseIdFromLocalStorage);

              window.location.href = "/bkash-payment.html"; // Redirect to payment page
            });

            // Attach event listener for "Start Your Course" button (if user is a student)
            enterButton.addEventListener("click", (event) => {
              const courseId = event.target.getAttribute("data-course-id");
              console.log("Starting course:", course.title);
              // Navigate to course page or similar functionality
              window.location.href = `coursec.html`; // Replace with your course starting URL
              localStorage.setItem("coursename", course.title);
            });

            courseCard.appendChild(enterButton);
            courseCard.appendChild(enrollButton);
            container.appendChild(courseCard);
          });
        })
        .catch((error) => console.error("Error fetching student payments:", error));
    })
    .catch((error) => console.error("Error fetching courses:", error));
}

fetchCourses();
