document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("rePassword").value;
    const errorElement = document.getElementById("error");

    // Clear previous errors
    errorElement.textContent = "";

    // Validate phone number
    if (!/^[0-9]{10}$/.test(phone)) {
        errorElement.textContent = "Phone number must be exactly 10 digits.";
        return;
    }

    // Validate passwords
    if (password !== rePassword) {
        errorElement.textContent = "Passwords do not match.";
        return;
    }

    // Proceed with signup logic (e.g., sending data to the server)
    const signupData = {
        name,
        email,
        phone,
        password,
    };

    console.log("Signup Data:", signupData);

    alert("Signup successful!"); // Replace with actual success handling
});