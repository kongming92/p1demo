var BoardControl = function(board, startId, stopId) {

	var self = Object.create(BoardControl.prototype);

	var stopped = true;
	var TIMESTEP = 200;
	var timer;

	var rules = Rules();

	var $boardElts = [];
	from_to(0, GAME_SIZE_X - 1, function(i) {
		$boardElts.push([]);
	});

	var $startButton = $('#start-button');
	var $selector = $('select');

	var startAnimate = function() {
		timer = setInterval(takeStep, TIMESTEP);
		$startButton.text('Stop').removeClass('start').addClass('stop');
		$selector.attr('disabled', true);
		stopped = false;
	};

	var stopAnimate = function() {
		if (typeof timer !== 'undefined') {
			clearInterval(timer);
		}
		$startButton.text('Start').removeClass('stop').addClass('start');
		$selector.attr('disabled', false);
		stopped = true;
	};

	var takeStep = function() {
		board = board.getNewBoardState(rules);
		drawBoard();
	};

	var drawBoard = function() {
		from_to(0, GAME_SIZE_X - 1, function(i) {
			from_to(0, GAME_SIZE_Y - 1, function(j) {
				$cell = $boardElts[i][j];
				if (board.isAlive(i, j)) {
					$cell.addClass('alive');
				} else {
					$cell.removeClass('alive');
				}
			});
		});
	};

	self.init = function() {
		// create the DOM elements that make up the board
		var $container = $('#main-container');
		from_to(0, GAME_SIZE_Y - 1, function(j) {
			var $row = $('<div />', {
				'class': 'row'
			});
			from_to(0, GAME_SIZE_X - 1, function(i) {
				var $cell = $('<div />', {
					'class': 'cell',
					'click': function(e) {
						if ($(this).hasClass('alive')) {
							board.setDead(i ,j);
							$(this).removeClass('alive');
						} else {
							board.setAlive(i, j);
							$(this).addClass('alive');
						}
					}
				});
				$row.append($cell);
				$boardElts[i][j] = $cell;
			});
			$container.append($row);
		});

		drawBoard();

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
				conditions = initialize.getRandomInitialConditions(0.2);
			} else if (option === 'oscillator') {
				conditions = initialize.getOscillators();
			} else if (option === 'blank') {
				conditions = initialize.getBlank();
			} else {
				conditions = initialize.getRandomInitialConditions(0.1);
			}

			board = Board(conditions);
			drawBoard();
		});

	};

	return self;
};