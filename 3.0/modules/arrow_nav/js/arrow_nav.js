(function ($) {
	'use strict';

	var slideshowOpen = false;

	$(document).ready(function() {
		if (cooliris) {
			var show = cooliris.embed.show;

			cooliris.embed.show = function() {
				slideshowOpen = true;
				show.apply(this, arguments);
			};
		}
	});

	$(document).keydown(function(e) {

		// do not interfere with browser defaults like history navigation etc.
		if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) { return; }

		// do nothing if event happens inside form elements
		if (e.target.form && e.target.form.nodeType && e.target.form.nodeType === 1) { return; }

		// do not interfere with slideshow control
		if (slideshowOpen) {
			// check if it's still there
			slideshowOpen = false;

			$(document).find('object').each(function(){
				if (/cooliris/.test(this.data)) {
					slideshowOpen = true;
					return;
				}
			});

			if (slideshowOpen) { return; }
		}

		var direction = $(document.body).css("direction"),
			keyPrevious = 37,
			keyNext = 39,
			url;

		if (direction === 'rtl') {
			keyPrevious = 39;
			keyNext = 37;
		}

		switch (e.keyCode) {
			case keyPrevious:
				url = $('.g-paginator .g-first a').eq(-1).attr("href");
				break;

			case keyNext:
				url = $('.g-paginator .g-text-right a').eq(0).attr("href");
				break;
		}

		if (typeof url !== "undefined") {
			window.location = url;
			return false;
		}
	});

})(jQuery);
