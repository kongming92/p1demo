// A controller for the board displayed to the browser
// The BoardControl object contains functions for populating the DOM with the grid, responding
// to click events, and drawing the appropriate cells to the grid.

// For proper functionality, requires that there is a button with id start-button, and that
// possible initial states are found within a HTML select element.
var BoardControl = function(board) {

	var self = Object.create(BoardControl.prototype);

	// Is the board currently stopped? e.g not animating and taking time steps?
	// Changes to the board, or selecting a new board, can only be made when the board is stopped
	var stopped = true;
	var TIMESTEP = 200;
	var timer;

	var width = board.getWidth();
	var height = board.getHeight();
	var rules = Rules();

	var $startButton = $('#start-button');
	var $selector = $('select');

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

	// Begin to take time steps and animate the grid
	// Changes the button to read 'Stop' and disables the select element from being used
	var startAnimate = function() {
		timer = setInterval(takeStep, TIMESTEP);
		$startButton.text('Stop').removeClass('start').addClass('stop');
		$selector.attr('disabled', true);
		stopped = false;
	};

	// Stop taking time steps so that the grid no longer changes
	// Changes the button to read 'Start' and re-enables the select element
	var stopAnimate = function() {
		if (typeof timer !== 'undefined') {
			clearInterval(timer);
		}
		$startButton.text('Start').removeClass('stop').addClass('start');
		$selector.attr('disabled', false);
		stopped = true;
	};

	// On each step, get the board's state, and draw it to the browser
	var takeStep = function() {
		board = board.getNewBoardState(rules);
		drawBoard();
	};

	// Create the board to be rendered in the browser by creating a grid of <div> elements
	// For each element, keep its reference in the $boardElts array and attach click handlers to it
	var createBoard = function() {
		var $container = $('#main-container');
		from_to(0, height - 1, function(j) {
			var $row = $('<div />', {
				'class': 'row'
			});
			from_to(0, width - 1, function(i) {
				var $cell = $('<div />', {
					'class': 'cell',
					'click': function(e) {
						if (stopped) {
							if ($(this).hasClass('alive')) {
								board.setDead(i ,j);
								$(this).removeClass('alive');
							} else {
								board.setAlive(i, j);
								$(this).addClass('alive');
							}
						}

					}
				});
				$row.append($cell);
				$boardElts[i][j] = $cell;
			});
			$container.append($row);
		});
	};

	// Draw the current state of the board
	// The board will be rendered properly in the browser if the class 'alive' produces the proper styling
	// to indicate an alive cell.
	var drawBoard = function() {
		from_to(0, width - 1, function(i) {
			from_to(0, height - 1, function(j) {
				var $cell = $boardElts[i][j];
				if (board.isAlive(i, j)) {
					$cell.addClass('alive');
				} else {
					$cell.removeClass('alive');
				}
			});
		});
	};

	self.init = function() {
		$startButton.on('click', function(e) {
			if (stopped) {
				startAnimate();
			} else {
				stopAnimate();
			}
		});

		$selector.on('change', function(e) {
			var option = $selector.val();
			var initialize = Initialize();
			var conditions;

			if (option === 'random20') {
				conditions = initialize.getRandomInitialConditions(width, height, 0.2);
			} else if (option === 'oscillator') {
				conditions = initialize.getOscillators();
			} else if (option === 'blank') {
				conditions = initialize.getBlank();
			} else {
				conditions = initialize.getRandomInitialConditions(width, height, 0.1);
			}

			board = Board(width, height, conditions);
			drawBoard();
		});

		createBoard();
		drawBoard();

	};

	Object.freeze(self);
	return self;
};