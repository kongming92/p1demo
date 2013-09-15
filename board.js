var GameCoord = function(x, y) {
	var that = Object.create(Board.prototype);
	that.x = x;
	that.y = y;
	return that;
};

var State = function(width, height, alive) {
	var that = Object.create(State.prototype);
	that.width = width;
	that.height = height;
	that.alive = alive;
	return that;
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

	var getNumNeighbors = function(x, y) {

		var numNeighbors = 0;
		from_to(Math.max(0, x-1), Math.min(width-1, x+1), function(i) {
			from_to(Math.max(0, y-1), Math.min(height-1, y+1), function(j) {
				if (!(x === i && y === j) && that.isAlive(i, j)) {
					numNeighbors += 1;
				}
			});
		});

		return numNeighbors;
	};

	that.isAlive = function(x, y) {
		return board[x][y];
	};

	that.getNewBoardState = function(rules) {

		var newInitAlive = [];

		from_to(0, width-1, function(i) {
			from_to(0, height-1, function(j) {
				if (rules.isAliveNext(getNumNeighbors(i, j), that.isAlive(i, j))) {
					newInitAlive.push(GameCoord(i, j));
				}
			});
		});

		return Board(State(width, height, newInitAlive));
	};

	return that;
};