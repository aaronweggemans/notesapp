$(window).scroll(function () {
    parallax();
    atLocation();
});

function parallax() {
    var scroll = $(window).scrollTop();

    $('.image').css('background-position', 'center ' + (scroll) / 12 + 'px');
    $('.centered').css('top', 40 - (scroll) / 12 + '%')
        .css('opacity', 1 - (scrollY / innerHeight) > 0 ? 1 - (scrollY / innerHeight) * 6 : 0);
}

function atLocation() {
    var scroll = $(window).scrollTop();

    if(scroll === 400 || scroll > 400) {

        $(".slideIn")
            .css('margin-left', -140 + ((scroll / innerHeight) * 100), scroll === 0 ? scroll : 0)
            .css('opacity', (scroll - 400) / 16);
    }
}