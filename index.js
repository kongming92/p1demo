DEBUG = false;
// define the number of points in the game grid
var GAME_SIZE_X = 60;
var GAME_SIZE_Y = 60;

$(document).ready(function() {

	var board = Board();

	// pass control off to the board controller, which takes care of drawing
	BoardControl(board).init();

});