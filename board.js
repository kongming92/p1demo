// The GameCoord object simply takes two numbers and stores an (x,y) tuple that represents the
// coordinate of a cell in the overall game grid.
var GameCoord = function(x, y) {
	var self = Object.create(GameCoord.prototype);
	self.x = x;
	self.y = y;
	return self;
};


// The object that represents a Game of Life board.

// A board is initialized with its dimensions and the list of alive cells (which is an array of GameCoord)
// Boards are immutable. One can create new Board objects to represent the changes in state -- by calling
// getNewBoardState(), for example.
var Board = function(width, height, rules, alive) {

	var self = Object.create(Board.prototype);
	var board = [];

	// Initialize a completely empty board
	from_to(0, width-1, function() {
		var col = [];
		from_to(0, height-1, function() {
			col.push(false);
		});
		board.push(col);
	});

	if (alive === undefined) {
		alive = Initialize(width, height).getInitialConditions();
	}

	// Set the appropriate cells on the board to be true
	each(alive, function(coord) {
		board[coord.x][coord.y] = true;
	});

	// Helper function that gives the number of alive neighbors surrounding the cell at (x, y) according
	// to the rules of Game of Life. It takes into account the 8 surrounding cells (includes diagonal neighbors)
	// The inputs to the function x and y must be valid board coordinates
	// (i.e. nonnegative and no greater than the width or height of the board)

	// Note: At the edge of the board, cells that are "off the board" are always considered to be dead.
	// So, for example, the cell at (0, 0) - the top left corner - has at most 3 live neighbors
	// (right, below, and diagonally right/below)
	var getNumNeighbors = function(x, y) {
		assert(x >= 0 && x < width, 'x is not within bounds');
		assert(y >= 0 && y < width, 'y is not within bounds');

		var numNeighbors = 0;
		from_to(Math.max(0, x-1), Math.min(width-1, x+1), function(i) {
			from_to(Math.max(0, y-1), Math.min(height-1, y+1), function(j) {
				if (!(x === i && y === j) && self.isAlive(i, j)) {
					numNeighbors += 1;
				}
			});
		});

		return numNeighbors;
	};

	// Returns the status of the cell at position (x, y). Requires that the inputs x and y be valid board coordinates
	// (i.e. nonnegative and no greater than the width or height of the board)
	self.isAlive = function(x, y) {
		assert(x >= 0 && x < width, 'x is not within bounds');
		assert(y >= 0 && y < width, 'y is not within bounds');
		return board[x][y];
	};

	// Given a Board, return a new Board of the next time step according to the rules passed into the function.
	// The existing Board is not modified.

	// The rules object must provide a public function isAliveNext that determines whether a cell is alive
	// at the next timestep depending on how many alive neighbors it has and whether the cell is alive
	// at the current timestep.
	self.getNewBoardState = function() {
		var newAlive = [];
		from_to(0, width-1, function(i) {
			from_to(0, height-1, function(j) {
				if (rules.isAliveNext(getNumNeighbors(i, j), self.isAlive(i, j))) {
					newAlive.push(GameCoord(i, j));
				}
			});
		});

		return Board(width, height, rules, newAlive);
	};

	// To debug the private function getNumNeighbors
	if (DEBUG) {
		self.getNumNeighbors = getNumNeighbors;
	}

	return self;
};