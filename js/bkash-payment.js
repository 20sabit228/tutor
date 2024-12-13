const phoneInput = document.getElementById("phone-number");
const pinInput = document.getElementById("bkash-pin");
const payNowButton = document.getElementById("pay-now");
const phoneError = document.getElementById("phone-error");
const pinError = document.getElementById("pin-error");
const successMessage = document.getElementById("success-message");

payNowButton.addEventListener("click", function () {
  // Reset error states
  phoneError.style.display = "none";
  pinError.style.display = "none";

  const phoneNumber = phoneInput.value.trim();
  const pin = pinInput.value.trim();

  let isValid = true;

  // Validate phone number (must be 11 digits)
  if (!/^\d{11}$/.test(phoneNumber)) {
    phoneError.style.display = "block";
    isValid = false;
  }

  // Validate PIN (must be 4 digits)
  if (!/^\d{4}$/.test(pin)) {
    pinError.style.display = "block";
    isValid = false;
  }

  // If valid, display success message
  if (isValid) {
    successMessage.style.display = "block";

    // Optionally, redirect or handle further logic here
    setTimeout(() => {
      window.location.href = "payment-success.html";
    }, 2000); // Redirect after 2 seconds
  }
});
