
menu_collapse_width = 720;

$(document).ready(function () {
    switch_menus_if_small_window();

    $('#hamburger-button, nav a').click(function () {
        $('#nav-links').toggle('swing');
    });

    $(window).resize(function () {
        switch_menus_if_small_window();
    });
});

function switch_menus_if_small_window() {
    if($(window).width() <= menu_collapse_width) {
        // Switch to hamburger mode
        $('#hamburger-button').show();
        $('#nav-links').addClass('collapsed-nav-links');
        $('nav h3').addClass('wide-title');
        $('nav').mouseleave(function () {
            $('#nav-links').hide('swing');
        });
    }
    else {
        // Switch to normal menu mode
        $('nav').unbind('mouseleave');
        $('#hamburger-button').hide();
        $('#nav-links').removeClass('collapsed-nav-links');
        $('nav h3').removeClass('wide-title');
        $('#nav-links').show();

    }
}
