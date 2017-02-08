const path = require('path');

module.exports = (Franz, options) => {
	Franz.injectCSS(path.join(__dirname, 'css', 'franz.css'));

	$('.topbar:has(.profile.signed-in)').css('display', 'none');

	function getMessages() {
		let unread = 0;
		let finished = '';
		let status = '';

		if ($('#status-image-popup').length) {
			status = $('#status-image-popup img').attr('alt');

			if (status === 'build:errored') {
				unread = 'x';
			} else if (status === 'build:failed') {
				finished = $('span:contains("Finished in")');

				if (jQuery.type(finished) === 'object') {
					status = finished.parent().next('p').find('span').text();

					status = status.split(',');

					if (jQuery.type(status) === 'array' && status.length === 4) {
						status = status[2].trim().split(' ');
						status = status[0];

						unread = status;
					} else {
						// This should never happen... only shown if build failed but count can't be found
						unread = '&bull;'
					}
				}
			}
		}

		Franz.setBadge(unread);
	}

	Franz.loop(getMessages);
}
