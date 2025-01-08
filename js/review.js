document.getElementById("reviewForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission reload
  
    // Get the review input
    const reviewText = document.getElementById("review").value;
  
    // Get the course title and username from localStorage
    const courseTitle = localStorage.getItem("coursename");
    const username = localStorage.getItem("username");
  
    if (!courseTitle || !username) {
      alert("No course or user selected. Please select a course and ensure you are logged in.");
      return;
    }
  
    // Prepare the data to send
    const reviewData = {
      course_title: courseTitle,
      review: reviewText,
      username: username,
    };
  
    // Send the data to the server
    fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit review.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Review submitted successfully:", data);
        document.getElementById("responseMessage").textContent = "Review submitted successfully!";
        document.getElementById("review").value = ""; // Clear the textarea
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        document.getElementById("responseMessage").textContent = "Failed to submit review. Please try again.";
      });
  });
  