const accountInput = document.getElementById("bank-account");
const pinInput = document.getElementById("bank-pin");
const payNowButton = document.getElementById("pay-now");
const accountError = document.getElementById("account-error");
const pinError = document.getElementById("pin-error");
const successMessage = document.getElementById("success-message");

payNowButton.addEventListener("click", function () {
  // Reset error states
  accountError.style.display = "none";
  pinError.style.display = "none";

  const accountNumber = accountInput.value.trim();
  const pin = pinInput.value.trim();

  let isValid = true;

  // Validate bank account number (must be 17 digits)
  if (!/^\d{17}$/.test(accountNumber)) {
    accountError.style.display = "block";
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
