const cardInput = document.getElementById('card-number');
const pinInput = document.getElementById('card-pin');
const payNowButton = document.getElementById('pay-now');
const cardError = document.getElementById('card-error');
const pinError = document.getElementById('pin-error');
const successMessage = document.getElementById('success-message');

payNowButton.addEventListener('click', function () {
    // Reset error states
    cardError.style.display = 'none';
    pinError.style.display = 'none';

    const cardNumber = cardInput.value.trim();
    const pin = pinInput.value.trim();

    let isValid = true;

    // Validate card number (must be 13 digits)
    if (!/^\d{13}$/.test(cardNumber)) {
        cardError.style.display = 'block';
        isValid = false;
    }

    // Validate PIN (must be 4 digits)
    if (!/^\d{4}$/.test(pin)) {
        pinError.style.display = 'block';
        isValid = false;
    }

    // If valid, display success message
    if (isValid) {
        successMessage.style.display = 'block';

        // Optionally, redirect or handle further logic here
        setTimeout(() => {
            window.location.href = 'payment-success.html';
        }, 2000); // Redirect after 2 seconds
    }
});