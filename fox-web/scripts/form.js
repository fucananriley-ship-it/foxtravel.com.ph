// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.querySelector('#quoteForm');
    
    quoteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const vehicleType = quoteForm.querySelector('select').value;
        const pickupLocation = quoteForm.querySelector('input[placeholder="Enter pickup location"]').value;
        const destination = quoteForm.querySelector('input[placeholder="Enter destination"]').value;
        const travelDate = quoteForm.querySelector('input[type="date"]').value;
        const pickupTime = quoteForm.querySelector('input[type="time"]').value;
        const firstName = quoteForm.querySelector('input[placeholder="Enter first name"]').value;
        const lastName = quoteForm.querySelector('input[placeholder="Enter last name"]').value;
        const emailAddress = quoteForm.querySelector('input[type="email"]').value;
        const mobileNumber = quoteForm.querySelector('input[type="tel"]').value;

        // Format email body
        const emailBody = `Dear Fox Travel Team,

I would like to request a quote for the following transportation service:

Trip Details:
Vehicle Type: ${vehicleType}
Pickup Location: ${pickupLocation}
Destination: ${destination}
Travel Date: ${travelDate}
Pickup Time: ${pickupTime}

Client Details:
Name: ${firstName} ${lastName}
Email: ${emailAddress}
Mobile: ${mobileNumber}

Looking forward to your response.

Best regards,
${firstName} ${lastName}`;

        // Encode the email body for the URL
        const encodedBody = encodeURIComponent(emailBody);
        const encodedSubject = encodeURIComponent(`Transportation Quote Request - ${vehicleType}`);

        // Submit to Formspree endpoint
        const formData = new FormData(quoteForm);
        
        fetch(quoteForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Redirect to thank you page
                window.location.href = 'thank-you.html';
            } else {
                // Fallback to Gmail compose
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@foxtravel.com&su=${encodedSubject}&body=${encodedBody}`;
                window.open(gmailUrl, '_blank');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            // Fallback to Gmail compose
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@foxtravel.com&su=${encodedSubject}&body=${encodedBody}`;
            window.open(gmailUrl, '_blank');
        });
    });
}); 