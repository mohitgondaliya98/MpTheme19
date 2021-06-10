$(document).ready(function () {

	//Prevent Page Reload on all # links
	$("body").on("click", "a[href='#']", function (e) {
		e.preventDefault();
	});

	//placeholder
	$("[placeholder]").each(function () {
		$(this).attr("data-placeholder", this.placeholder);
		$(this).bind("focus", function () {
			this.placeholder = '';
		});
		$(this).bind("blur", function () {
			this.placeholder = $(this).attr("data-placeholder");
		});
	});

	// On scroll Add Class
	$(window).scroll(function (e) {
		if ($(window).scrollTop() > 200) {
			$(".wrapper").addClass('page-scrolled');
		}
		else {
			$(".wrapper").removeClass('page-scrolled');
		}
	});

	// Footer margin set for stick to bottom
	function footerAdj() {
		var footerH = $(".footer").innerHeight();
		$(".footer").css({ "margin-top": -footerH });
		$(".main-content").css({ "padding-bottom": footerH });
	};
	footerAdj();
	$(window).resize(function () {
		footerAdj();
	});

	// Add remove class when window resize finished
	var $resizeTimer;
	$(window).on("resize", function (e) {
		if (!$("body").hasClass("window-resizing")) {
			$("body").addClass("window-resizing");
		}
		clearTimeout($resizeTimer);
		$resizeTimer = setTimeout(function () {
			$("body").removeClass("window-resizing");
		}, 250);

		generateCustomScroll();
	});

	// Add new js functions here -----------------------------------------------------------------


	// Float Label on formcontrol

	if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
		$("body").addClass("chrome");
	}
	if (isIE()) {
		$("body").addClass("ie");
	}
	$("body").on("focus", ".floating-label .form-control", function () {
		var field = $(this);
		if (!$(this).hasClass('bootstrap-select') && $(this).prop('tagName') != 'SELECT') {
			field.closest('.floating-label').addClass('is-focused');
		}
	});
	$("body").on("blur change", ".floating-label .form-control", function () {
		var field = $(this);
		if ($(this).hasClass('bootstrap-select')) {
			field = $(this).find("select.selectpicker.form-control");
		}
		var value = field.val();
		if (value) {
			value = value.trim();
		}
		if (value && value != "") {
			field.closest('.floating-label').removeClass('is-focused').addClass('has-value');
		} else {
			field.closest('.floating-label').removeClass('is-focused has-value');
		}
		field.val(value);
	});
	$(".floating-label .form-control").each(function () {
		$(this).trigger("blur");
	});
	$("body").on("hidden.bs.dropdown", ".floating-label .bootstrap-select", function () {
		var bootstrapSelect = $(this);
		var selectMenu = $(this).find("select.selectpicker");
		selectMenu.prop("disabled", true);
		selectMenu.selectpicker("refresh");
		bootstrapSelect.addClass('disabled-view');
		setTimeout(function () {
			selectMenu.prop("disabled", false);
			selectMenu.selectpicker("refresh");
			bootstrapSelect.removeClass('disabled-view');
		}, 300);
	});


	// Toggle Menu
	$(".menu-btn").on("click", function () {
		$('body').toggleClass("toggle-nav");
	});

	// Toggle Search
	$(".search-btn").on("click", function () {
		$('body').removeClass("toggle-nav");
		$('body').toggleClass("toggle-search");
		setTimeout(function () {
			$('.header-search > .form-control').focus();
		}, 100);
	});

	// Toggle overlayer
	$(".overlayer").on("click", function () {
		$('body').removeClass("toggle-search toggle-nav");
	});

	// Count Animation
	$('.count').each(function () {
		if ($(this).offset().top - $(window).innerHeight() < $("html,body").scrollTop()) {
			if (!$(this).hasClass("animation-done")) {
				$(this).prop('Counter', 0).animate({
					Counter: $(this).text()
				}, {
					duration: 2000,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
				}).addClass("animation-done");
			}
		}
	});

	// mScroll
	generateCustomScroll();
	// if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && $(window).width() >= 991) {
	// 	$('.sidebar').on('mousewheel DOMMouseScroll', function (e) {
	// 		var e0 = e.originalEvent,
	// 			delta = e0.wheelDelta || -e0.detail;

	// 		this.scrollTop += (delta < 0 ? 1 : -1) * 30;
	// 		e.preventDefault();
	// 	});
	// }


	// JscrollPane for tabs
	var $mainClass = $(".tab-heading");
	$mainClass.each(function () {
		var $tab = $(this);

		function ulWidth() {
			var navW = 0;
			$tab.find("> ul > li").each(function () {
				navW = navW + $(this).outerWidth(true);
			});
			$tab.find("> ul").css({
				"width": navW + 5
			});
		}
		ulWidth();
		$(window).resize(function (e) {
			ulWidth();
		});

		$tab.jScrollPane({
			showArrows: true,
			horizontalGutter: 25
		});

		function scrollAdj() {
			$tab.data('jsp').reinitialise();
		};
		scrollAdj();
		$(window).resize(function () {
			scrollAdj();
		});

		$tab.find("ul li a").click(function (e) {
			e.preventDefault();
			var $this = $(this).closest('li');
			if ($tab.attr('active-center') == "true")
				$tab.data('jsp').scrollByX(parseInt(($this.offset().left - $tab.offset().left) + ($this.innerWidth() / 2)) - ($tab.innerWidth() / 2));
			if (!$this.hasClass('active')) {
				$this.closest(".tab-block").find(".active").removeClass('active');
				$this.addClass('active');
				$($this.find('a').attr("href")).addClass("active");
			}
			$(window).resize();
		});
	});

	// Don't add anything below this --------------------------------------------------------------
	// Add Class on Window Load
	$("body").addClass("page-loaded");
});

function generateCustomScroll() {
	if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && $(window).width() >= 991) {
		$(".scroller").each(function () {
			var $this = $(this);
			$this.mCustomScrollbar({
				axis: "y",
				mouseWheelPixels: 150,
				scrollInertia: 0,
				autoHideScrollbar: true,
				autoExpandScrollbar: false,
				alwaysShowScrollbar: false
			});
		});
		$('.sidebar').on('mousewheel DOMMouseScroll', function (e) {
			var e0 = e.originalEvent,
				delta = e0.wheelDelta || -e0.detail;

			this.scrollTop += (delta < 0 ? 1 : -1) * 30;
			e.preventDefault();
		});
	}
	else {
		$(".scroller").each(function () {
			var $this = $(this);
			$this.mCustomScrollbar("destroy");
		});
	}
}

function isIE() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
	{
		return true;
	}
	return false;
}

function isChromeSafari() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) {
		if (ua.indexOf('chrome') > -1) {
			$("body").addClass('chrome');
		} else {
			$("body").addClass('safari');
		}
	}
}
