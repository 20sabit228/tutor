// Simulate login state (replace with real authentication logic)
const isLoggedIn = false; // Change to `true` if user is logged in.

const profileBtn = document.getElementById("profileBtn");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

if (isLoggedIn) {
  // User is logged in: show "My Profile" and hide "Login" and "Register"
  profileBtn.style.display = "block";
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";

  profileBtn.onclick = () => {
    window.location.href = "profile.html"; // Redirect to profile page
  };
} else {
  // User is not logged in: show "Login" and "Register", hide "My Profile"
  profileBtn.style.display = "none";

  loginBtn.onclick = () => {
    window.location.href = "in.html"; // Redirect to login page
  };

  signupBtn.onclick = () => {
    window.location.href = "signup.html"; // Redirect to signup page
  };
}
