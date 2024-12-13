const paymentType = document.getElementById('payment-type');
const sessionPackages = document.getElementById('session-packages');
const courseInfo = document.getElementById('course-info');
const proceedButton = document.getElementById('proceed');

// Show/hide relevant fields based on payment type
paymentType.addEventListener('change', function () {
    if (paymentType.value === 'session-wise') {
        sessionPackages.classList.remove('hidden');
        courseInfo.classList.add('hidden');
    } else if (paymentType.value === 'entire-course') {
        sessionPackages.classList.add('hidden');
        courseInfo.classList.remove('hidden');
    }
});

// Handle the proceed button click
proceedButton.addEventListener('click', function () {
    const selectedPaymentType = paymentType.value;
    const paymentMethod = document.getElementById('payment-method').value;
    let redirectUrl = '';

    // Determine redirect URL based on payment method
    switch (paymentMethod) {
        case 'bkash':
            redirectUrl = 'bkash-payment.html';
            break;
        case 'bank-account':
            redirectUrl = 'bank-payment.html';
            break;
        case 'card':
            redirectUrl = 'card-payment.html';
            break;
        default:
            alert('Please select a valid payment method.');
            return;
    }

    // Store selected data in localStorage for use on the next page
    localStorage.setItem('paymentType', selectedPaymentType);
    if (selectedPaymentType === 'session-wise') {
        const selectedPackage = document.getElementById('package').value;
        localStorage.setItem('package', selectedPackage);
    } else {
        localStorage.setItem('package', 'entire-course');
    }

    // Redirect to the appropriate payment method page
    window.location.href = redirectUrl;
});