function fetchCourses() {
  fetch("http://localhost:3000/api/tutor")
    .then((response) => response.json())
    .then((courses) => {

      console.log("Received courses:", courses);
      const container = document.getElementById("coursesContainer");
      container.innerHTML = ""; // Clear container before adding courses

      courses.forEach((course) => {
        const courseCard = `
                  <div class='course-card'>
                      <h3>${course.title}</h3>
                      <p>${course.description}</p>
                      <p class='price'>Price: $${course.price}</p>
                      <p>Rating: ⭐ ${course.rating}</p>
                      <p>Instructor: ${course.instructor}</p>
                  </div>
              `;
        container.innerHTML += courseCard;
      });
    })
    .catch((error) => console.error("Error fetching courses:", error));
}

fetchCourses();
