const accountInput = document.getElementById("bank-account");
const transactionInput = document.getElementById("transaction-id");
const payNowButton = document.getElementById("pay-now");
const accountError = document.getElementById("account-error");
const transactionError = document.getElementById("transaction-error");
const successMessage = document.getElementById("success-message");
const price=localStorage.getItem('price')

document.querySelector('#price').textContent = `${price}`;
// Event listener for "Pay Now" button
payNowButton.addEventListener("click", function () {
  // Reset error states
  accountError.style.display = "none";
  transactionError.style.display = "none";
  successMessage.style.display = "none"; // Hide success message on new click
  
  const accountNumber = accountInput.value.trim();
  const transactionId = transactionInput.value.trim();

  // Retrieve courseId and userId from local storage
  const courseId = localStorage.getItem("courseId");
  const userId = localStorage.getItem("username");

  // Check if courseId and userId are available
  if (!courseId || !userId) {
    alert("Please log in first");
    return;
}

  let isValid = true;

  // Validate bank account number (must be 17 digits)
  if (!/^\d{17}$/.test(accountNumber)) {
    accountError.style.display = "block";
    isValid = false;
  }

  // Validate Transaction ID (must not be empty)
  if (!transactionId) {
    transactionError.style.display = "block";
    isValid = false;
  }

  // If validation fails, stop the request
  if (!isValid) return;

    // Construct the payload
    const paymentData = {
      courseId: courseId,
      userId: userId,
      trx: transactionId,
      info: accountNumber,
      type: "Bank",
    };

    console.log("Payment Data:", paymentData); // Log payment data for debugging

    // Send data to the backend
    fetch("http://localhost:3000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => {
        if (!response.ok) {
          // If the response is not OK, parse the error message from the response body
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Failed to process payment. Please try again.");
          });
        }
        return response.json(); // Assuming backend responds with JSON
      })
      .then((data) => {
        if (data.success) {
          // Display success message and redirect
          successMessage.style.display = "block";
          setTimeout(() => {
            window.location.href = "index.html"; // Redirect to payment success page
          }, 2000); // Delay redirection for 2 seconds
        } else {
          alert(data.message || "Payment failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message); // Show the error message to the user
      });
  });
  
