document.addEventListener("DOMContentLoaded", () => {
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");
    const userTypeElement = document.getElementById("userType");
    const logoutBtn = document.getElementById("logoutBtn");

    // Fetch user data from localStorage (replace this with a server call if needed)
    const name = localStorage.getItem("username") || "Unknown User";
    const email = localStorage.getItem("email") || "No email provided";
    const phone = localStorage.getItem("phone") || "No phone number provided"; // Add phone data on login
    const userType = localStorage.getItem("userType") || "Standard"; // Default userType

    // Display user data on the profile page
    nameElement.textContent = name;
    emailElement.textContent = email;
    phoneElement.textContent = phone;
    userTypeElement.textContent = userType;
    console.log(name)
   // Logout functionality
    if (userType=='teacher'){
        addcourse.style.display = "block"
    }
    else{
        addcourse.style.display = "none"
    }
    logoutBtn.addEventListener("click", () => {
        // Clear localStorage
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("userType");

        // Redirect to the login page
        window.location.href = "in.html";
    });
});
