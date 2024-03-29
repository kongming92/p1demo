var Rules = function() {

	var self = Object.create(Rules.prototype);

	// For each cell, the rules of Game of Life dictate that only its current alive-ness
	// and the number of neighbors affect its alive-ness at the next time step

	// The board is responsible for calculating the number of neighbors, and whether the
	// cell is alive or not.

	// The function expects numNeighbors to be a nonnegative integer, and isAlive to be boolean true or false
	// The board is responsible for making sure that the inputs to this function satisfy these conditions.

	// This function simply returns whether a cell with numNeighbors neighbors and isAlive
	// should be alive the next time step

	// http://en.wikipedia.org/wiki/Conway's_Game_of_Life#Rules

	self.isAliveNext = function(numNeighbors, isAlive) {

		assert(typeof numNeighbors === 'number', 'numNeighbors is not a number');
		assert(numNeighbors >= 0, 'numNeighbors is negative');
		assert(typeof isAlive === 'boolean', 'isAlive is not a boolean');

		// Rules taken from Wikipedia's description of the game:
		// http://en.wikipedia.org/wiki/Conway's_Game_of_Life#Rules
		if (isAlive) {
			if (numNeighbors === 2 || numNeighbors === 3) {
				return true;
			}
			return false;
		} else {
			if (numNeighbors === 3) {
				return true;
			}
			return false;
		}
	};

	Object.freeze(self);
	return self;
};