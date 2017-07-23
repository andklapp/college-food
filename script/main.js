$(document).ready(function () {
    $('#hamburger-button, nav a').click(function () {
        $('#nav-links').toggle('swing');
    });

    $('nav').mouseleave(function () {
        $('#nav-links').hide('swing');
    });
});
