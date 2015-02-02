// smooth scroll to anchor
$(function() {
  $('a[href*=#]:not([href=#],.carousel-control)').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - $('#nav').height()
        }, 1000);
        return false;
      }
    }
  });
});

// ekko lightbox
$(document).ready(function ($) {
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox();
    });
});

// navbar affix
$(function() {
    $('#nav').affix({
        offset: {
            top: $('#nav').offset().top
        }
    }); 
    $(window).on('resize', function() {
        if($('#nav').hasClass('affix-top')) {
            $('#nav').data('bs.affix').options.offset = $('#nav').offset().top;
        }
        else if($('#nav').hasClass('affix')) {
            $('#nav').removeClass('affix').addClass('affix-top');
            $('#nav').data('bs.affix').options.offset = $('#nav').offset().top;
            $('#nav').removeClass('affix-top').addClass('affix');
        }
    });
});

// equal heights
function equalHeights() {
	var $col = $('.equal>*'),
		maxHeight = [],
		rows = [],
		rowTop = 0,
		rowIndex = 0;

	$col.each(function() {
        $el = $(this);
        $el.css('height', '');
        if ($el.offset().top > rowTop) {
            rowIndex++;
            rows[rowIndex] = [];
            rowTop = $el.offset().top;
            maxHeight[rowIndex] = 0;
        }
        if ($el.height() > maxHeight[rowIndex]) {
            maxHeight[rowIndex] = $el.height();
        }
        rows[rowIndex].push($el);
    });
	for (row = 1; row <= rowIndex; row++) {
		for (i = 0; i <= rows[row].length; i++) {
			$(rows[row][i]).height(maxHeight[row]);
		}
	}
}
$(window).on('resize load', equalHeights);

$( "#contactForm" ).submit(function( event ) {
    event.preventDefault();
    
    var $form = $(this),
        data = $form.serialize(),
        action = $form.attr("action"),
        $input = $form.find('input, select, textarea').prop('disabled', 1),
        $btn = $form.find('button').button('loading');
    
    var send = $.post(action, data)
        .always(function() {
            $input.prop('disabled', 0);
            $btn.button('reset');
            $form.find('.alert').remove();
            if (typeof Recaptcha != "undefined") {
                Recaptcha.reload();
            }
            $('html,body').animate({ scrollTop: $('#content').offset().top }, 1000);
        })
        .done(function(data) {
            if(data.status == 'sent') {
                $form[0].reset();
                $form.prepend('<div class="alert alert-success">Message sent successfully. We will be in touch shortly.</div>');
            } else {
                $form.prepend('<div class="alert alert-danger">Error: ' + data.error + '</div>');
                //$form.prepend('<div class="alert alert-danger">Error. Please check your entries and try again.</div>');
                
            }
        })
        .fail(function(data) {
            $form.prepend('<div class="alert alert-danger">Error: ' + data.error + '</div>');
        });
});
