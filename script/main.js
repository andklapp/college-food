$(document).ready(function () {
    $('#hamburger-button, nav a').click(function () {
        $('#nav-links').toggle();
    });

    $('nav').mouseleave(function () {
        $('#nav-links').hide();
    });
});
