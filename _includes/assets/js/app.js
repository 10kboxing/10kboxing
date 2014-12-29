/*$("h1").fitText();*/

$('#carousel').on('slide.bs.carousel', function () {
    $('.parallax-mirror').hide();
    //console.log($('.parallax-mirror'));
});

$('#carousel').on('slid.bs.carousel', function () {
    var index = $('#carousel .active').index('#carousel .item');
    var $banner = $('#carousel .active .banner');
    $banner.parallax({imageSrc: $banner.data('imageSrc')});
    
    $($('.parallax-mirror')[$('#carousel .item').length - index]).show();
    
    console.log($('.parallax-mirror'));
});

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
/*
var lastScrollTop = 0,
    direction = 'down';
$(window).scroll(function(){
        var st = $(this).scrollTop(), 
            height = $(this).height() - 50;
            
            
        if(st < lastScrollTop || (st > 0 && st === lastScrollTop)) {
            direction = 'up';
        } else if(st > lastScrollTop || (st === 0 && st === lastScrollTop)) {
            direction = 'down';
        }
        console.log(direction);
        
        if(st < height) {
            $('html,body').animate({ scrollTop: () ? 0 : height }, 1000, function(){ lastScrollTop = st; });
        } else lastScrollTop = st;
});
*/

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

if ($("#countdown").length > 0) {
  jQuery(document).ready(function(){	
    //var dateParts = $('#countdown').data("date") .match(/(\d+)-(\d+)-(\d+) (\d+):(\d+)/);
    
	dateFuture1 = new Date($('#countdown').data("date"))
	GetCount(dateFuture1, 'countdown');
  });
}	
function GetCount(ddate,iid){
    dateNow = new Date();	//grab current date
    amount = ddate.getTime() - dateNow.getTime();	//calc milliseconds between dates
    delete dateNow;

    // if time is already past
    if(amount < 0){
        document.getElementById(iid).innerHTML="";
    }
    // else date is still good
    else{
        days=0;hours=0;mins=0;secs=0;out="";

        amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

        days=Math.floor(amount/86400);
        if(days > 1) {amount=amount%(days*86400);}
        hours=Math.floor(amount/3600);
        amount=amount%3600;

        mins=Math.floor(amount/60);
        amount=amount%60;

        secs=Math.floor(amount);

        //if(hours != 0){out += "<span>" + hours +((hours==1)?"<br /><small>hour</small>":"<small>hours</small>")+"</span>";}
        out += "<span>" + days +((days==1)?"<br /><small>day</small>":"<small>days</small>")+"</span>";
        out += "<span>" + hours +((hours==1)?"<br /><small>hour</small>":"<small>hours</small>")+"</span>";
        out += "<span>" + mins +((mins==1)?"<small>min</small>":"<br /><small>mins</small>")+"</span>";
        out += "<span>" + secs +((secs==1)?"<small>sec</small>":"<br /><small>secs</small>")+"</span>";
        out = out.substr(0,out.length-2);
        document.getElementById(iid).innerHTML=out;

        setTimeout(function(){GetCount(ddate,iid)}, 1000);
    }
}

// delegate calls to data-toggle="lightbox"
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	event.preventDefault();
	return $(this).ekkoLightbox();
});

/*/ smoove
function close(a,b) {
    if(20 * Math.round(a/20) === 20 * Math.round(b/20)) return true;
}
$('.box-list>li, .fullrow .row>*').each( function() {
    if(close($(this).offset().left, $(this).parent().offset().left)) {
        $(this).data({move: '-100px,100px'});
    }
    else if(close($(this).offset().left + $(this).outerWidth(), $(this).parent().offset().left + $(this).parent().outerWidth())) {
        $(this).data({move: '100px,100px'});
    }
    else {
        $(this).data({moveY: '100px'});
    }
});
$('section, .box-list>li, .fullrow .row>*').smoove({offset: '10%'});

*/
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
