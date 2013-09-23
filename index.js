DEBUG = false;

$(document).ready(function() {
	var GAME_SIZE_X = 60;
	var GAME_SIZE_Y = 60;
	var board = Board(GAME_SIZE_X, GAME_SIZE_Y);
	// pass control off to the board controller
	BoardControl(board).init();
});