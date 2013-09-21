var Initialize = function(sizeX, sizeY) {

	var self = Object.create(Initialize.prototype);

	// Initialize the board randomly, where each cell has initial probability of being alive given by factor
	// If factor is not defined, it defaults to 0.05
	var getRandomInitialConditions = function(factor) {
		if (typeof factor === 'undefined') {
			factor = 0.1;
		}
		assert(typeof factor === 'number' && factor >= 0 && factor <= 1, 'factor is not a number between 0 and 1');
		var starting = [];

		from_to(0, sizeX - 1, function(i) {
			from_to(0, sizeY - 1, function(j) {
				if (Math.random() < factor) {
					starting.push(GameCoord(i, j));
				}
			});
		});
		return starting;
	};

	// Oscillators are taken from the Wikipedia article on Game of Life
	// http://en.wikipedia.org/wiki/Conway's_Game_of_Life#Examples_of_patterns
	var getOscillators = function() {
		var starting = [];

		blinker = listToGameCoords([[10, 10], [11, 10], [12, 10]]);

		toad = listToGameCoords([[30, 30], [31, 30], [32, 30],
								[29, 31], [30, 31], [31, 31]]);

		beacon = listToGameCoords([[10, 20], [11, 20], [10, 21],
									[12, 23], [13, 22], [13,23]]);

		pulsar = listToGameCoords([[40, 42], [40, 43], [40, 44], [40, 48], [40, 49], [40, 50],
									[42, 40], [42, 45], [42, 47], [42, 52],
									[43, 40], [43, 45], [43, 47], [43, 52],
									[44, 40], [44, 45], [44, 47], [44, 52],
									[45, 42], [45, 43], [45, 44], [45, 48], [45, 49], [45, 50],
									[47, 42], [47, 43], [47, 44], [47, 48], [47, 49], [47, 50],
									[48, 40], [48, 45], [48, 47], [48, 52],
									[49, 40], [49, 45], [49, 47], [49, 52],
									[50, 40], [50, 45], [50, 47], [50, 52],
									[52, 42], [52, 43], [52, 44], [52, 48], [52, 49], [52, 50]]);

		return starting.concat(blinker, toad, beacon, pulsar);
	};

	var listToGameCoords = function(coordsList) {
		gameCoords = [];
		each(coordsList, function(item) {
			gameCoords.push(GameCoord(item[0], item[1]));
		});
		return gameCoords;
	};

	if (getParam('oscillator') === 'true') {
		self.getInitialConditions = getOscillators;
	} else {
		self.getInitialConditions = getRandomInitialConditions;
	}

	return self;
};