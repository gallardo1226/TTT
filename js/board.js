define([], function() {
  "use strict";

  function Board() {
		this.topleft = 0;
		this.top = 0;
		this.topright = 0;
		this.left = 0;
		this.center = 0;
		this.right = 0;
		this.bottomleft = 0;
		this.bottom = 0;
		this.bottomright = 0;
  }

	function getSpace(board, space) {
		return board[space];
	}

	function setSpace(board, space, val) {
		board[space] = val;
	}

	function getScore(board, depth) {
		var results = {};
		results.topRow = board.topleft + board.top + board.topright;
		results.middleRow = board.left + board.center + board.right;
		results.bottomRow = board.bottomleft + board.bottom + board.bottomright;
		results.leftCol = board.topleft + board.left + board.bottomleft;
		results.middleCol = board.top + board.center + board.bottom;
		results.rightCol = board.topright + board.right + board.bottomright;
		results.leftDiag = board.topleft + board.center + board.bottomright;
		results.rightDiag = board.topright + board.center + board.bottomleft;
		for (var r in results) {
			if (Math.pow(results[r], 2) == 9) {
				return results[r] > 0 ? 10 - depth : depth - 10;
			}
		}
		return 0;
	}

	function getMoves(board) {
		var moves = [];
		var i = 0;
		for (var move in board) {
			if (board[move] === 0) {
				moves[i] = move;
				i++;
			}
		}
		return moves;
	}

	function copyBoard(board) {
		var board2 = new Board();
		for (var space in board)
			board2[space] = board[space];
		return board2;
	}

  return {
		get: getSpace,
		set: setSpace,
    score: getScore,
    moves: getMoves,
    copy: copyBoard,
    Board: Board
  };
});