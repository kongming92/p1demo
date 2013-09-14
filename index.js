	// define some colors

	var blue = Color(0,0,255);

	// create the drawing pad object and associate with the canvas
	var pad = Pad(document.getElementById('canvas'));

	var CELL_SIZE = 4;
	var GAME_SIZE_X = pad.get_width() / CELL_SIZE;
	var GAME_SIZE_Y = pad.get_height() / CELL_SIZE;
	var rules = Rules();


	// FOR TESTING ONLY
	var starting = [];
	from_to(0, GAME_SIZE_X-1, function(i) {
		from_to(0, GAME_SIZE_Y-1, function(j) {
			if (Math.random() < 0.1) {
				starting.push(GameCoord(i, j));
			}
		});
	});

	///

	var state = State(GAME_SIZE_X, GAME_SIZE_Y, starting);
	var board = Board(state);

	var stepTime = function() {
		drawBoard(board, pad);
		board = board.getNewBoardState(rules);
	};

	var drawBoard = function(board, pad) {
		pad.clear();
		from_to(0, GAME_SIZE_X - 1, function(i) {
			from_to(0, GAME_SIZE_Y - 1, function(j) {
				if (board.isAlive(i, j)) {
					pad.draw_rectangle(Coord(i * CELL_SIZE, j * CELL_SIZE), CELL_SIZE, CELL_SIZE, 1, blue, blue);
				}
			});
		});
	};

stepTime();
setInterval(stepTime, 1000);


