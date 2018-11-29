$(document).ready(function () {
    var etHeroTabsContainer = $(".et-hero-tabs-container");
    var etHeroTab = $(".et-hero-tab");

    var homeUrl = 'http://localhost:4000/';

    if(document.URL == homeUrl)
    {
        console.log(homeUrl);
    }
    else
    {
        etHeroTabsContainer
            .css("background-color", "black");
        etHeroTab
            .css("color", "white")
            .css("font-weight", "");
    }

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        parallax(scroll);
        atLocation(scroll);

        if (document.URL == homeUrl) {
            etHeroTabsContainer
                .css("background-color", "");

            if (scroll == 0 || scroll > 0 && scroll < 10) {
                etHeroTabsContainer.removeClass('scrolledNav');
                etHeroTab
                    .css("color", "white")
                    .css("font-weight", "bold")
                    .css("font-size", "1.5em");
            } else if (scroll > 10) {
                etHeroTabsContainer
                    .addClass('scrolledNav');
                etHeroTab
                    .css("color", "black")
                    .css("font-weight", "")
                    .css("font-size", "1em");
            }
        } else {
            etHeroTabsContainer
                .css("background-color", "black");
        }
    });

    $(".mat-input").focus(function(){
        $(this).parent().addClass("is-active is-completed");
    });

    $(".mat-input").focusout(function(){
        if($(this).val() === "")
            $(this).parent().removeClass("is-completed");
        $(this).parent().removeClass("is-active");
    })
});

function parallax(scroll) {
    $('.image').css('background-position', 'center ' + (scroll) / 12 + 'px');
    $('.centered').css('top', 40 - (scroll) / 12 + '%')
        .css('opacity', 1 - (scrollY / innerHeight) > 0 ? 1 - (scrollY / innerHeight) * 6 : 0);
}

function atLocation(scroll) {
    if (scroll === 400 || scroll > 400) {
        $(".slideIn")
            .css('margin-left', -140 + ((scroll / innerHeight) * 100), scroll === 0 ? scroll : 0)
            .css('opacity', (scroll - 400) / 16);
    }
}