
$(document).ready(function (){
    // console.log("Turbo loaded!");
    const avatarIcons = [
        "https://images.unsplash.com/photo-1633506079263-7029b4f46762?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1657851613794-13616dbcc247?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1743247299142-35028faf885d?auto=format&fit=crop&q=80&w=200&h=200",
        "https://images.unsplash.com/photo-1653368653487-f55b96d90853?auto=format&fit=crop&q=80&w=200&h=200",
    ]

    let loginBtn = $("#profile-btn");
    loginBtn.click(function () {
        Turbo.visit("/profile");
    });

    let charactersBtn = $("#characters-btn");
    charactersBtn.click(function () {
        Turbo.visit("/character_creation");
    });

    let prevAvatarBtn = $("#prev-avatar-btn");
    prevAvatarBtn.click(function () {
        // Handle previous avatar logic
    });

    let nextAvatarBtn = $("#next-avatar-btn");
    nextAvatarBtn.click(function () {
        // Handle next avatar logic
    });
});