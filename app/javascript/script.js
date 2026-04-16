$(document).on('turbo:load', function() {
    const signUpForm = document.querySelector('form[action="/sign_up_process"]');

    if (signUpForm) {
        signUpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            
            // Collect data from the form
            const formData = {
                email: document.querySelector('#email').value,
                password: document.querySelector('#password').value,
                // standard rails csrf token
                // authenticity_token : csrfToken
            };

            try {
                const response = await fetch('/sign_up_process', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    // Success: Use Turbo to enter the dashboard
                    Turbo.visit("/dashboard");
                } else {
                    // Fail: Show validation errors (e.g., "Email is already taken")
                    alert(data.message);
                }
            } catch (error) {
                console.error("Sign up error:", error);
            }
        });
    }
});