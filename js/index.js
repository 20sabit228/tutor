document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profileBtn");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("loggedIn");
  const userType=localStorage.getItem('userType')

  if (isLoggedIn === "true") {
      // User is logged in: Show "My Profile" and "Logout", hide "Login" and "Sign Up"
      profileBtn.style.display = "block";
      logoutBtn.style.display = "block";
      loginBtn.style.display = "none";
      signupBtn.style.display = "none";
      emergency.style.display='block';

      profileBtn.addEventListener("click", () => {
          window.location.href = "profile.html"; // Redirect to profile page
      });

      logoutBtn.addEventListener("click", () => {
          // Clear login state and user data
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("username");
          localStorage.removeItem("email");

          // Redirect to login page
          window.location.href = "in.html"; // Update with your login page URL
      });
      emergency.addEventListener("click", () => {
        if (userType=='teacher')
        window.location.href = "http://localhost:3300/admin"; // Redirect to signup page
        if (userType=='student'){
            window.location.href = "http://localhost:3300"; // Redirect to signup page

        }
      });


  }
   else {
      // User is not logged in: Show "Login" and "Sign Up", hide "My Profile" and "Logout"
      profileBtn.style.display = "none";
      logoutBtn.style.display = "none";

      loginBtn.addEventListener("click", () => {
          window.location.href = "in.html"; // Redirect to login page
      });

      signupBtn.addEventListener("click", () => {
          window.location.href = "signup.html"; // Redirect to signup page
      });
      emergency.addEventListener("click", () => {
        window.location.href = "http://localhost:3300/"; // Redirect to signup page
      });

  }});