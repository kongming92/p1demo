// A controller for the board displayed to the browser
// The BoardControl object contains functions for creating the grid of <div> elements, responding
// to click events, and drawing the appropriate cells to the grid.

// The controller assumes the existence of a corresponding BoardView, which handles the DOM-level
// drawing tasks.

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

	// The View object for the board
	// Ultimately handles all of the drawing (e.g. changing the HTML class to render cells as alive/dead)
	// Also keeps a 2-dimensional array of all DOM elements in the grid
	var boardView = BoardView(width, height);

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

	// On each step, get the board's new state, and draw it to the browser
	var takeStep = function() {
		board = board.getNewBoardState(rules);
		drawBoard();
	};

	// Create the board to be rendered in the browser by creating a grid of <div> elements
	// For each element, attach click handlers to it, and then pass it to the view with the proper coordinates

	// Requires that the BoardView object has a public addElt function which adds the created <div> elements
	// to the proper location in the grid
	var createBoard = function() {
		from_to(0, height - 1, function(j) {
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
				boardView.addElt(i, j, $cell);
			});
		});
	};

	// Draw the current state of the board
	// Requires that the view provide public setAlive and setDead methods,
	// without worrying about their implementation in the DOM
	var drawBoard = function() {
		from_to(0, width - 1, function(i) {
			from_to(0, height - 1, function(j) {
				if (board.isAlive(i, j)) {
					boardView.setAlive(i, j);
				} else {
					boardView.setDead(i, j);
				}
			});
		});
	};

	// The function that does all of the inital setup of the game in the browser
	// Attaches handlers to clicking the start/stop button and changing options in the selector
	// Finally, calls the createBoard function to create the grid of <div>'s, renders them
	// in the view, and draws the alive cells.
	self.init = function() {
		$startButton.on('click', function(e) {
			if (stopped) {
				startAnimate();
			} else {
				stopAnimate();
			}
		});

		$selector.on('change', function(e) {
			var option = $selector.val();	// the option string is encoded in the HTML
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
		boardView.renderGrid();
		drawBoard();

	};

	Object.freeze(self);
	return self;
};