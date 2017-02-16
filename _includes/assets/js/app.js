var myhash = window.location.hash;
if (myhash) {
    if (window.history && window.history.pushState) {
        window.history.pushState('', '', window.location.pathname);
    } else {
        window.location.href = window.location.href.replace(/#.*$/, '#');
    }
    $('html,body').animate({
        scrollTop: $(myhash).offset().top - $('#nav').height()
    }, 1000);
}
// smooth scroll to anchor
$(function() {
    $('a[href*=#]:not([href=#],.carousel-control)').click(function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
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
$(document).ready(function($) {
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
        if ($('#nav').hasClass('affix-top')) {
            $('#nav').data('bs.affix').options.offset = $('#nav').offset().top;
        } else if ($('#nav').hasClass('affix')) {
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

if ($('#basket').length > 0) {
    simpleCart({
        checkout: {
            type: "PayPal",
            email: "{{site.paypal}}"
        },
        currency: "GBP",
        cartColumns: [{
                view: function(item, column) {
                    return '<p>' + item.get('name') + '<br>' +
                        '<a href="javascript:;" class="simpleCart_remove">Remove</a>';
                },
                attr: "name",
                label: "Name"
            },
            {
                attr: "price",
                label: "Price",
                view: 'currency'
            },
            {
                view: function(item, column) {
                    return '<a href="javascript:;" class="simpleCart_decrement">-</a> ' +
                        item.quantity() + ' ' +
                        '<a href="javascript:;" class="simpleCart_increment">+</a>';
                },
                attr: "custom",
                label: "Quantity"
            }
        ]
    });
    simpleCart.bind("afterAdd", function(item) {
        $('html,body').animate({
            scrollTop: $('#basket').offset().top - $('#nav').height()
        }, 1000);
        /*
        toastr.success( item.get("name") + " - " + item.get("size") + " was added to the basket." );

        setTimeout(function() {
            var quantity = simpleCart.quantity();
            toastr.info(
                "Your new sub-total is " + simpleCart.toCurrency( simpleCart.total() ) + " (" + quantity + " item" + (quantity !== 1 ? "s" : "") + "). &nbsp; " +
                "<a class='btn btn-primary' href='" + $('.navbar-cart a.btn').attr('href') + "'>" +
                "<span class='fa fa-shopping-cart'></span> View basket</a>"
            );
        }, 2000);
        */
    });
    simpleCart.bind("update", function(e) {
        if (simpleCart.quantity()) {
            $('.simpleCart_checkout').attr('disabled', false);
        } else {
            $('.simpleCart_checkout').attr('disabled', true);
        }
    });

    function get_cart_count() {
        var quantity = simpleCart.quantity();
        return quantity + " item" + quantity !== 1 ? "s" : "";
    }
}
