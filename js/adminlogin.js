document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent traditional form submission

    const password = document.getElementById("pass").value;
    const errorDiv = document.getElementById("error");

    if (password === "1234") {
        // Redirect to the admin page
        window.location.href = "admin.html";
    } else {
        // Display an error message
        errorDiv.textContent = "Incorrect password. Please try again.";
        errorDiv.style.display = "block";
    }
});
