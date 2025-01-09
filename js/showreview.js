   // Get the course name from localStorage
   const courseName = localStorage.getItem("coursename");

   fetch(`http://localhost:3000/api/showreviews?course_title=${courseName}`)
   .then((response) => {
     if (!response.ok) {
       throw new Error("Failed to fetch reviews.");
     }
     return response.json();
   })
   .then((reviews) => {
     const reviewsContainer = document.getElementById("reviewsContainer");
     reviewsContainer.innerHTML = " "; // Clear any existing content
 
     if (reviews.length === 0) {
       reviewsContainer.innerHTML = `<p class="no-reviews">No reviews available for this course.</p>`;
     } else {
       reviews.forEach((review) => {
         const reviewDiv = document.createElement("div");
         reviewDiv.classList.add("review");
         reviewDiv.innerHTML = `
           <p><strong>Username:</strong> ${review.username}</p>
           <p><strong>Review:</strong> ${review.review}</p>
           <p><em>Submitted on ${new Date(review.created_at).toLocaleDateString()}</em></p>
         `;
         reviewsContainer.appendChild(reviewDiv);
       });
     }
   })
   .catch((error) => {
     console.error("Error fetching reviews:", error);
     document.getElementById("reviewsContainer").innerHTML = `<p class="no-reviews">Failed to load reviews. Please try again later.</p>`;
   });
 