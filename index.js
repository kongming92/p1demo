(function() {

	var BLUE = Color(0,0,255);
	var TIMESTEP = 500; // in ms

	// create the drawing pad object and associate with the canvas
	var padStart = Pad(document.getElementById('canvas-start'));
	var pad = Pad(document.getElementById('canvas'));

	var CELL_SIZE = 8;
	var GAME_SIZE_X = pad.get_width() / CELL_SIZE;
	var GAME_SIZE_Y = pad.get_height() / CELL_SIZE;
	var rules = Rules();

	var board = Board(GAME_SIZE_X, GAME_SIZE_Y, Initialize(GAME_SIZE_X, GAME_SIZE_Y).getInitialConditions());

	var stepTime = function() {
		drawBoard(board, pad);
		board = board.getNewBoardState(rules);
	};

	var drawBoard = function(board, pad) {
		pad.clear();
		from_to(0, GAME_SIZE_X - 1, function(i) {
			from_to(0, GAME_SIZE_Y - 1, function(j) {
				if (board.isAlive(i, j)) {
					pad.draw_rectangle(Coord(i * CELL_SIZE, j * CELL_SIZE), CELL_SIZE, CELL_SIZE, 1, BLUE, BLUE);
				}
			});
		});
	};

	drawBoard(board, padStart);
	setInterval(stepTime, TIMESTEP);

})();


