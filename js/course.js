function fetchCourses() {
  fetch("http://localhost:3000/api/courses")
    .then((response) => response.json())
    .then((courses) => {
      console.log("Received courses:", courses);
      const container = document.getElementById("coursesContainer");
      container.innerHTML = ""; // Clear container before adding courses
      const userType=localStorage.getItem('userType')
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

        const enrollButton = document.createElement("button");
        enrollButton.classList.add("enroll");
        enrollButton.textContent = "Enroll Now";
        enrollButton.setAttribute("data-course-id", course.id);
        if (userType=='teacher'){
          enrollButton.style.display='none'
        }
        // Attach event listener for "Enroll Now" button
        enrollButton.addEventListener("click", (event) => {
          const courseId = event.target.getAttribute("data-course-id");
          console.log("Enrolling in course:", course.title);
          localStorage.setItem("courseId", course.title);

          const courseIdFromLocalStorage = localStorage.getItem("courseId");
          console.log(courseIdFromLocalStorage);

          window.location.href = "/bkash-payment.html"; // Redirect to payment page
        });

        courseCard.appendChild(enrollButton);
        container.appendChild(courseCard);
      });
    })
    .catch((error) => console.error("Error fetching courses:", error));
}

fetchCourses();
