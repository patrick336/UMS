// The functionality to detect element on the viewport
// @return true or false.
(function($) {

	$.fn.fixHeight = function() {
		$self = $(this);

		var resizer = function() {

			$self.css('height', 'auto');
			var maxHeight = 0;

			$self.each(function() {
				if ($(this).outerHeight(false) > maxHeight) maxHeight = $(this).outerHeight(false);
			});
			$self.css('height', maxHeight);
		}; // resizer

		resizer();
		$(window).resize(resizer);
		return this;
	};

	$.fn.isInViewport = function() {

		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	$.fn.extend({
		startAnimate: function(animationName, callback) {
			var animationEnd = (function(el) {
				var animations = {
					animation: 'animationend',
					OAnimation: 'oAnimationEnd',
					MozAnimation: 'mozAnimationEnd',
					WebkitAnimation: 'webkitAnimationEnd',
				};

				for (var t in animations) {
					if (el.style[t] !== undefined) {
						return animations[t];
					}
				}
			})(document.createElement('div'));

			this.addClass(animationName).one(animationEnd, function() {
				$(this).removeClass(animationName);

				if (typeof callback === 'function') callback();
			});

			return this;
		}
	});

})(jQuery);



var Global = (function () {

	var navigate = function() {

		var btnOpen = $("#js-btnMenu");
		var btnClose = $("#js-btn-close");
		var nav = $("#js-navigation");
		var navLinks = nav.find('a');

		btnOpen.on('click', function(){
			if(!nav.hasClass('is-open')) {
				nav.addClass('is-open');
			}
		});

		btnClose.on('click', function(){
			if(nav.hasClass('is-open')) {
				nav.removeClass('is-open');
			}
		});
	};

	var setNumberCarousel = function() {
		$(".carousel-main").on("init", function(slick) {
			$(this).find('.slick-dots button').each(function() {
				var t = $(this).text();

				if ( t < 10 ) {
					$(this).text( '0' +  t );
				}
			});
		});
	};

	var initCarousel = function() {

		$(".carousel-main").slick({
			infinite: true,
			speed: 700,
			ease: "ease",
			autoplay: true,
			autoplaySpeed: 4000,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			prevArrow: '<button class="arrow prev fa fa-angle-left"></button>',
			nextArrow: '<button class="arrow next fa fa-angle-right"></button>'
		});
	};

	var initOffertCarousel = function() {

		$(".our-offert-carousel").slick({
			infinite: true,
			speed: 800,
			ease: "ease",
			autoplay: true,
			autoplaySpeed: 4000,
			dots: false,
			arrows: false,
			prevArrow: '<button class="arrow prev fa fa-angle-left"></button>',
			nextArrow: '<button class="arrow next fa fa-angle-right"></button>',
			mobileFirst: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 1499,
					settings: {
						slidesToShow: 3
					}
				}
			]
		});
	};
	var animate = function() {
		$(window).on('resize scroll load refresh', function() {

			if($("#animation-line-1").length > 0 && $('[data-animate="#animation-line-1"]').isInViewport()) {
				$("#animation-line-1").addClass('animate');
			}

			if($("#animation-line-2").length > 0 && $('[data-animate="#animation-line-2"]').isInViewport()) {
				$("#animation-line-2").addClass('animate');
			}

			if($("#animation-line-3").length > 0 && $('[data-animate="#animation-line-3"]').isInViewport()) {
				$("#animation-line-3").addClass('animate');
			}

			if($("#animation-line-4").length > 0 && $('[data-animate="#animation-line-4"]').isInViewport()) {
				$("#animation-line-4").addClass('animate');
			}
		});

		$(".bounce-once").on('mouseenter', function() {
			if(!$(this).hasClass('icon-bounce')) {
				$(this).startAnimate('icon-bounce', function() {
					$(this).removeClass('icon-bounce');
				});
			}
		});
	};

	var initAos = function() {
		AOS.init({
			delay: 100,
			duration: 400,
			easing: 'ease-out-sine',
			disable: 'mobile'
		});
	};

	var loader = function() {
		setTimeout(function() {
			$("body").addClass("loaded");
		}, 1000);

		setTimeout(function(){
			initAos();
			animate();
		}, 1500);
	};

	var btnScrollTop = function() {

		var btnScroll = $("#js-btn-pageTop");

		btnScroll.on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, 1200);
		});

		$(window).on('scroll load refresh', function() {

			if($(this).scrollTop() > $(window).height()) {
				btnScroll.fadeIn('fast');
			}
			else {
				btnScroll.fadeOut('fast');
			}
		});
	};

	// public method
	return {
		setNumberCarousel: setNumberCarousel,
		initOffertCarousel: initOffertCarousel,
		initCarousel: initCarousel,
		navigate: navigate,
		initAos: initAos,
		loader: loader,
		btnScrollTop: btnScrollTop
	};

})();

$(function () {
	Global.loader();
	Global.setNumberCarousel();
	Global.initCarousel();
	Global.initOffertCarousel();
	Global.navigate();
	Global.btnScrollTop();

	$(".row-price").find('h3').fixHeight();
	$(".offert-content").find('.header').fixHeight();
	$(".offert-content").find('p').fixHeight();

});
