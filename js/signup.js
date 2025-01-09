document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("rePassword").value;
    const userType = document.getElementById("userType").value;
    const errorElement = document.getElementById("error");

    // Clear previous errors
    errorElement.textContent = "";

    // Validate phone number
    if (!/^[0-9]{11}$/.test(phone)) {
        errorElement.textContent = "Phone number must be exactly 11 digits.";
        return;
    }

    // Validate passwords
    if (password !== rePassword) {
        errorElement.textContent = "Passwords do not match.";
        return;
    }

    // Prepare the data to send to the server
    const signupData = {
        name,
        email,
        phone,
        password,
        userType, // Include userType in the data
    };

    // Send data to the server
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
    })
    
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to sign up.");
            }
            return response.text();
        })

        .then((message) => {
            alert(message); // Display success message
            window.location.href = "in.html"; // Redirect to index.html
        })
        .catch((error) => {
            console.error("Error:", error);
            errorElement.textContent = "Failed to sign up.";
        });
});
