// Use 'turbo:load' instead of 'ready' to work with Rails Turbo navigation
$(document).on('turbo:load', function() {
    
    // --- Avatar Logic ---
    const avatarIcons = [
        "https://images.unsplash.com/photo-1633506079263-7029b4f46762?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1657851613794-13616dbcc247?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1743247299142-35028faf885d?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1653368653487-f55b96d90853?auto=format&fit=crop&q=80&w=200&h=200",
    ];

    const avatarIconElement = $("#avatar-icon img");
    let currentAvatarIndex = 0;

    const updateAvatarIcon = (index) => {
        if (index >= avatarIcons.length) {
            currentAvatarIndex = 0;
        } else if (index < 0) {
            currentAvatarIndex = avatarIcons.length - 1;
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

    // --- Modern Fetch Login Flow ---
    const loginForm = document.querySelector("#login-form");
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const messageDiv = document.querySelector('#message');
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const payload = {
                login_identity: document.querySelector('#login_field').value,
                password: document.querySelector('#password').value
            };

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok) {
                    // Successful login: Use Turbo to go to dashboard
                    Turbo.visit("/dashboard");
                } else {
                    // Error: show the message returned by SessionsController
                    if (messageDiv) {
                        messageDiv.innerText = data.message || "Invalid credentials";
                        messageDiv.classList.add('error-text');
                    }
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        });
    }
});