function scroll_to_section(section /* Pass element id with # */) {
  // Get position of scroll target from top
  scroll_to = $(section).offset().top - $("#page-top").offset().top - ( $(section + " h2").outerHeight() / 2 )
  $('html, body').animate({
    scrollTop: scroll_to
 }, 1000);
}

function lang_pref(request) {
    if (request == "en"){
        Cookies.set('language-pref', 'en');
        $('.cs').css('display', 'none')
        $('.en').css('display', 'inherit')
    }
    else {
        Cookies.remove('language-pref');
        $('.en').css('display', 'none')
        $('.cs').css('display', 'inherit')
    }
}

(function ($) {
  $(document).ready(function(){
    if ((navigator.language != 'cs') || (Cookies.get('language-pref') == 'en')) {
        $('.cs').css('display', 'none')
        $('.en').css('display', 'inherit')
    }
    else {
        $('.en').css('display', 'none')
    }
    $('.venue-section').click(function() {
        $('.venue-section iframe').css('pointer-events', 'auto');
    });

    $('.venue-section').mouseleave(function() {
        $('.venue-section iframe').css('pointer-events', 'none'); 
    });

    $('.sponsor a').hover(function() {
        $('img', this).fadeOut(100);
        $('.sponsor-desc', this).delay(100).fadeIn(100);
    });

    $('.sponsor').mouseleave(function() {
        $('.sponsor-desc', this).fadeOut(100);
        $('img', this).delay(400).fadeIn(100);
    });


    if ($('#travel-text').length) {
         var travel_height = $('#travel-text')[0].scrollHeight;
        $('#more-text').click(function(e) {
            e.stopPropagation();
            $('#travel-text').animate({
                'height': travel_height
            }, 1500)
            $('#more-text').css('display', 'none')
            $('#less-text').css('display', 'inherit')
        });
        $('#less-text').click(function() {
            $('#travel-text').animate({
                'height': '400px'
            }, 1500)
            $('#more-text').css('display', 'inherit')
            $('#less-text').css('display', 'none')
        })
    }

    // get distance from top of the bottom logo border
    if ($("#devconf-logo").length) {
        logo_pos = $("#devconf-logo").offset().top - $("#page-top").offset().top

        // user can load already scrolled page (eg. refreshing, ...); check it even on document ready
        if ($(this).scrollTop() > logo_pos) {
        $('.navbar-brand').fadeIn();
        } else {
        $('.navbar-brand').fadeOut();
        }

        // hook on scroll and show/hide navbar
        $(function () {
            $(window).scroll(function () {
                // Keep amount of things here at minimum to keep it smooth on low-end devices
                if ($(this).scrollTop() > logo_pos) {
                $('.navbar-brand').fadeIn();
                } else {
                $('.navbar-brand').fadeOut();
                }
            });
        });
    }

    var parser = document.createElement('a');
    parser.href = document.URL;
    accepted_sections = ["#about", "#venue", "#contact"]
    if ($.inArray(parser.hash, accepted_sections) != -1) {
      scroll_to_section(parser.hash)
    }
});
  }(jQuery));
