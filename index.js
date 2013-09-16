(function() {

	DEBUG = false;

	var BLUE = Color(0,0,255);
	var TIMESTEP = 200; // in ms

	// create the drawing pad object and associate with the canvas
	// the padStart canvas shows the inital state and is never changed
	var padStart = Pad(document.getElementById('canvas-start'));
	var pad = Pad(document.getElementById('canvas'));

	// define the number of pixels of a single cell
	var CELL_SIZE = 4;

	// define the number of points in the game grid, which is equivalent to number of pixels / pixels per cell
	var GAME_SIZE_X = pad.get_width() / CELL_SIZE;
	var GAME_SIZE_Y = pad.get_height() / CELL_SIZE;
	var rules = Rules();

	// initialize the board
	var board = Board(GAME_SIZE_X, GAME_SIZE_Y, Initialize(GAME_SIZE_X, GAME_SIZE_Y).getInitialConditions());

	// things to do at each timestep:
	// first, draw the current state of the board to the pad
	// then, set the board variable to point to an updated board state
	var stepTime = function() {
		drawBoard(board, pad);
		board = board.getNewBoardState(rules);
	};

	// draw the board using the given drawing function
	// by iterating over the board and drawing the appropriate (alive) cells
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