var GameCoord = function(x, y) {
	var that = Object.create(Board.prototype);
	return {x: x, y: y};
};

var State = function(width, height, alive) {
	return {
		width: width,
		height: height,
		alive: alive
	};
};

var Board = function(initState) {

	var that = Object.create(Board.prototype);

	// Read in the initial state
	var width = initState.width;
	var height = initState.height;
	var initialAlive = initState.alive;

	var board = [];

	// Initialize a completely empty board
	from_to(0, width-1, function() {
		var col = [];
		from_to(0, height-1, function() {
			col.push(false);
		});
		board.push(col);
	});

	// Set the appropriate cells on the board to be true
	each(initialAlive, function(coord) {
		board[coord.x][coord.y] = true;
	});

	// Returns whether the cell at (x,y) is alive i.e. the boolean value of board[x][y]
	var isAlive = function(x, y) {
		return board[x][y];
	};

	var getNumNeighbors = function(x, y) {

		var numNeighbors = 0;
		from_to(Math.max(0, x-1), Math.min(width-1, x+1), function(i) {
			from_to(Math.max(0, y-1), Math.min(height-1, y+1), function(j) {
				if (!(x === i && y === j) && isAlive(i, j)) {
					numNeighbors += 1;
				}
			});
		});

		return numNeighbors;
	};

	that.getBoard = function() {
		return board.slice();
	};

	that.isAlive = isAlive;

	that.getNewBoardState = function(rules) {

		var newInitAlive = [];

		from_to(0, width-1, function(i) {
			from_to(0, height-1, function(j) {
				if (rules.isAliveNext(getNumNeighbors(i, j), isAlive(i, j))) {
					newInitAlive.push(GameCoord(i, j));
				}
			});
		});

		return Board(State(width, height, newInitAlive));
	};

	return that;
};