document.getElementById("refundForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form reload
  
    // Get input values
    const courseTitle = document.getElementById("courseTitle").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const username = localStorage.getItem("username"); // Assuming username is stored in localStorage
  
    if (!username) {
      alert("User is not logged in. Please log in to submit a refund request.");
      return;
    }
  
    // Prepare data for submission
    const refundData = {
      username,
      course_title: courseTitle,
      reason,
    };
  
    // Send refund request to the server
    fetch("http://localhost:3000/api/refunds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refundData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit refund request.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Refund request submitted successfully:", data);
        document.getElementById("responseMessage").textContent = "Refund request submitted successfully!";
        document.getElementById("refundForm").reset(); // Clear the form
      })
      .catch((error) => {
        console.error("Error submitting refund request:", error);
        document.getElementById("responseMessage").textContent = "Failed to submit refund request. Please try again.";
      });
  });
  