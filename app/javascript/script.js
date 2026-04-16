$(document).on('turbo:load', function() {

    const avatarIcons = [
        "https://images.unsplash.com/photo-1633506079263-7029b4f46762?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1657851613794-13616dbcc247?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1743247299142-35028faf885d?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1653368653487-f55b96d90853?auto=format&fit=crop&q=80&w=200&h=200",
    ]

    const avatarIconElement = $("#avatar-icon img");
    let currentAvatarIndex = 0;

    const updateAvatarIcon = (index) => {
        if (index >= avatarIcons.length) {
            currentAvatarIndex = 0;
        } else if (index < 0) {
            currentAvatarIndex = avatarIcons.length-1;
        } else {
            currentAvatarIndex = index;
        }
        avatarIconElement.attr("src", avatarIcons[currentAvatarIndex]);
    };

    // --- Button Navigations (using Turbo.visit) ---
    $("#profile-btn").on('click', () => Turbo.visit("/login"));
    $("#enter-btn").on('click', () => Turbo.visit("/dashboard"));
    $("#sign-up-btn").on('click', () => Turbo.visit("/sign_up"));
    $("#characters-btn").on('click', () => Turbo.visit("/character_creation"));

    $("#prev-avatar-btn").on('click', () => updateAvatarIcon(currentAvatarIndex - 1));
    $("#next-avatar-btn").on('click', () => updateAvatarIcon(currentAvatarIndex + 1));
    
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