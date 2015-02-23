define(["jquery", "game"], function ($, game) {

	function eventHandlers() {
		$('#select').fadeIn();

		$('.player').on('click', function() {
			$(this).addClass('disabled');
			game.start($(this));
		});

		$('#board .empty').on('click', function() {
			game.move($(this));
		});

		$('#board').on('click', 'button', function() {
			$('#board').fadeOut(function() {
				location.reload();
			});
		});
	}

	return {
		init: eventHandlers
	};
});

