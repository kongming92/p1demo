// The View object for the game board rendered in the browser.

// This View object handles all DOM-level drawing tasks. In particular, the View gets a list of DOM
// elements created by the Controller and their corresponding locations. The View manipulates these
// DOM elements to draw the game cells to screen properly, by changing their HTML classes.
var BoardView = function(width, height) {

	var self = Object.create(BoardView.prototype);

	// A 2-dimensional array of jQuery objects for DOM elements (<div>'s) that comprise
	// the board shown in the browser

	// Rep invariant:
	// $boardElts should be the same size as the board. That is, the length of $boardElts is width
	// and the length of each subarray of $boardElts is height.
	// Each $boardElts[i][j] should be a jQuery object corresponding to the cell located at (i, j)
	var $boardElts = [];
	from_to(0, width - 1, function(i) {
		$boardElts.push([]);
	});

	// Add the jQuery object given in $elt to the $boardElts array at position $boardElts[i][j]
	// Requires and x and y be valid board coordinates
	self.addElt = function(x, y, $elt) {
		assert(x >= 0 && x < width, 'x is not within bounds');
		assert(y >= 0 && y < height, 'y is not within bounds');
		$boardElts[x][y] = $elt;
	};

	// Renders the contents of $boardElts to the main-container DOM element in the browser
	// Renders the contents row by row, where each row is its own <div> element, and each cell
	// within the row is the <div> element specified in the $boardElts array.
	self.renderGrid = function() {
		var $container = $('#main-container');
		from_to(0, height - 1, function(j) {
			var $row = $('<div />', {
				'class': 'row'
			});
			from_to(0, width - 1, function(i) {
				var $cell = $boardElts[i][j];
				$row.append($cell);
			});
			$container.append($row);
		});
	};

	// Sets the cell at (x, y) to be alive. In particular, modifies the class of the <div> element
	// at (x, y) so that it is drawn as an "alive cell"

	// Requires and x and y be valid board coordinates
	self.setAlive = function(x, y) {
		assert(x >= 0 && x < width, 'x is not within bounds');
		assert(y >= 0 && y < height, 'y is not within bounds');
		$boardElts[x][y].addClass('alive');
	};

	// Sets the cell at (x, y) to be dead. In particular, modifies the class of the <div> element
	// at (x, y) so that it is drawn as an "dead cell"

	// Requires and x and y be valid board coordinates
	self.setDead = function(x, y) {
		assert(x >= 0 && x < width, 'x is not within bounds');
		assert(y >= 0 && y < height, 'y is not within bounds');
		$boardElts[x][y].removeClass('alive');
	};

	Object.freeze(self);
	return self;
};