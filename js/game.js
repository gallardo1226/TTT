define(["jquery", "board"], function($, board) {
	"use strict";

	var MAX_DEPTH = 5;
	var x = 'x';
	var o = 'o';
	var spacesLeft = 9;
	var human, computer, bestMove, game;

	function startGame(space) {
		game = new board.Board();
		human = space.attr('id');
		space.siblings().each(function() {
			computer = $(this).attr('id');
		});
		if (human == o)
			makeMove('center', computer);
		$('#select').fadeOut(function() {
			$('#select').remove();
		});
		$('#board').fadeIn();
		$('#board>div').height($('#board>div').width());
	}

	function playerMove(space) {
		makeMove(space.attr('id'), human);
		if (spacesLeft === 0)
			endGame();
		else
			compMove();
	}

	function compMove() {
		if (game.center === 0)
			bestMove = 'center';
		else
			minimax(game);
		makeMove(bestMove, computer);
		if (spacesLeft === 0 || board.score(game, 0) > 0)
			endGame();
	}

	function makeMove(move, player) {
		var sym = player == x ? 'close' : 'circle-o';
		$('#' + move).append('<i class="fa fa-' + sym +' fa-5x" style="display:none"></i>').removeClass('empty').off('click').find('i').fadeIn();
		var val = player == computer ? 1 : -1;
		board.set(game, move, val);
		spacesLeft--;
	}

	function minimax(game, depth) {
		if (typeof depth == "undefined") {
			depth = 0;
			bestMove = null;
		}

		var score = board.score(game, depth);
		console.log('current score: ' + score);
		console.log('depth: ' + depth);
		var moves = board.moves(game);
		if (depth >= MAX_DEPTH || score !== 0 || moves.length === 0)
			return score;

		var max = depth % 2 === 0;
		var bestScore = max ? -Infinity : Infinity;
		for (var i = 0; i < moves.length; i++) {
			var game2 = board.copy(game);
			board.set(game2, moves[i], max ? 1 : -1);
			score = minimax(game2, depth + 1);
			if (max) {
				if (score > bestScore) {
					bestScore = score;
					if (depth === 0)
						bestMove = moves[i];
				}
			} else {
				if (score < bestScore) {
					bestScore = score;
					if (depth === 0)
						bestMove = moves[i];
				}
			}
		}

		return bestScore;
	}

	function endGame() {
		$('#board .empty').each(function() {
			$(this).removeClass('empty').off('click');
		});
		$('#board').prepend('<div id="end" class="text-center col-md-12"></div>');
		if (board.score(game, 0) > 0)
			$('#end').append('<h1>I win!</h1>');
		else
			$('#end').append('<h1>It\'s a draw!</h1>');
		$('#end').append('<button class="btn btn-lg again">Play again?</button>');
		$('#end').slideDown();
	}

	return {
		start: startGame,
		move: playerMove
	};
});