document.getElementById("loginForm").addEventListener("submit", function(event) {
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

    // Proceed with login logic (e.g., sending data to the server)
    const loginData = {
        email,
        password,
    };

    console.log("Login Data:", loginData);

    // Simulate success
    alert("Login successful!"); // Replace with actual success handling
});