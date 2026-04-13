
$(document).ready(function (){
    // console.log("Turbo loaded!");
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

    const loginBtn = $("#profile-btn");
    loginBtn.click(function () {
        Turbo.visit("/login");
    });

    const charactersBtn = $("#characters-btn");
    charactersBtn.click(function () {
        Turbo.visit("/character_creation");
    });

    const prevAvatarBtn = $("#prev-avatar-btn");
    prevAvatarBtn.click(function () {
        updateAvatarIcon(currentAvatarIndex - 1);
    });

    const nextAvatarBtn = $("#next-avatar-btn");
    nextAvatarBtn.click(function () {
        updateAvatarIcon(currentAvatarIndex + 1);
    });
});