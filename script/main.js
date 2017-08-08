
menu_collapse_width = 1000;
nav_height = 50;
url_variables = url_variables_to_object();

$(document).ready(function () {
    switch_menus_if_small_window();

    $('#hamburger-button, nav a').click(function () {
        $('#nav-links').toggle('swing');
    });

    $(window).resize(function () {
        switch_menus_if_small_window();
    });

    $(window).scroll(function () {
        if($(window).scrollTop() > nav_height) {
            $('button#to-top').show();
        }
        else {
            $('button#to-top').hide();
        }
    });

    $('button#to-top').click(function () {
        $(window).scrollTop(0);
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
    // TODO: Error handling!
    var page_url = "";

    if(page_name) {
        page_url = './pages/' + page_name + '.html';
    }
    else {
        page_name = 'home'
        page_url = './pages/home.html';
    }

    $('#content-container').load(page_url, function() {
            if(page_name == 'home') {
                initialize_recipe_slideshow();
            }
        });
}

function initialize_recipe_slideshow() {
    recipe_data = $.ajax({
        url:'./script/recipe-list.json',
        dataType: 'json',
        mimeType: 'application/json',
        success: function(result) {
            var recipes = [];
            $.each(result, function(i, recipe) {
                var img_url = './images/' + recipe["image"];
                var page_url = './recipes/' + recipe["filename"];
                var $img_div = build_recipe_image_div(recipe["title"], img_url, page_url);
                $('#center-container').append($img_div);
                console.log($img_div);
            });
            $('#center-container').slick({
                prevArrow: $('#slick-prevArrow'),
                nextArrow: $('#slick-nextArrow')
            });
        }
    });

}

function build_recipe_image_div(title, image_url, page_url) {
    // TODO: Make the recipe loading prettier and not immediate.
    return $('<div></div>')
        .html('<h3>' + title + '</h3>')
        .css({'background-image': 'url("' + image_url + '")'})
        .click(function() {
            $('#recipe-container').load(page_url);
        });
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
