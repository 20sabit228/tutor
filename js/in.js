document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("error");

    // Clear previous errors
    errorElement.textContent = "";

    // Basic Validation
    if (!email) {
        errorElement.textContent = "Email is required.";
        return;
    }
    if (!password) {
        errorElement.textContent = "Password is required.";
        return;
    }

    // Prepare login data
    const loginData = { email, password };

    try {
        // Send login data to the server
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.success) {
            // Save user details to localStorage
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userId", result.id);
            localStorage.setItem("username", result.username);
            localStorage.setItem("email", email);
            localStorage.setItem("phone", result.phone);
            localStorage.setItem("userType", result.userType);

            // Redirect to the homepage
            window.location.href = "/index.html"; // Update with your actual homepage URL
        } else {
            // Show error message
            errorElement.textContent = result.message || "Invalid credentials.";
        }
    } catch (error) {
        console.error("Error:", error);
        errorElement.textContent = "An error occurred. Please try again later.";
    }
});
