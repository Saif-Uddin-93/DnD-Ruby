
$(document).ready(function (){
    // console.log("Turbo loaded!");
    var loginBtn = $("#profile-btn");
    loginBtn.click(function () {
        Turbo.visit("/profile");
    });

    var charactersBtn = $("#characters-btn");
    charactersBtn.click(function () {
        Turbo.visit("/character_creation");
    });
});