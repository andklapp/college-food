
menu_collapse_width = 720;
url_variables = url_variables_to_object();

$(document).ready(function () {
    switch_menus_if_small_window();

    $('#hamburger-button, nav a').click(function () {
        $('#nav-links').toggle('swing');
    });

    $(window).resize(function () {
        switch_menus_if_small_window();
    });

    load_page(url_variables.page);
});

function url_variables_to_object() {
    var url_variable_object = {};
    var all_variables_string = decodeURIComponent(window.location.search.substring(1));
    var variable_pair_list = all_variables_string.split('&');
    for(i = 0; i < variable_pair_list.length; i++) {
        var variable_pair = variable_pair_list[i].split('=');
        if(variable_pair[1]) {
            url_variable_object[variable_pair[0]] = variable_pair[1];
        }
    }

    return url_variable_object;
}

function load_page(page_name) {
    var page_url = './pages/' + page_name + '.html';
    alert(page_url);
    if(page_name) {
        $('#content').load(page_url);
    }
}

function switch_menus_if_small_window() {
    if($(window).width() <= menu_collapse_width) {
        // Switch to hamburger mode
        $('#nav-links').fadeOut('swing', function () {
            $('#hamburger-button').fadeIn('swing');
            $('#nav-links').addClass('collapsed-nav-links');
            $('nav h3').addClass('wide-title');
        });
        $('nav').mouseleave(function () {
            $('#nav-links').fadeOut('swing');
        });
    }
    else {
        // Switch to normal menu mode
        $('nav').unbind('mouseleave');
        $('#hamburger-button').fadeOut('swing', function () {
            $('#nav-links').removeClass('collapsed-nav-links');
            $('nav h3').removeClass('wide-title');
            $('#nav-links').fadeIn('swing');
        });

    }
}

