DEBUG = true;

test("testing blank initialization of 3x3 grid", function() {
	var smallBoard = Board(3, 3, []);
	from_to(0, 2, function(i) {
		from_to(0, 2, function(j) {
			equal(smallBoard.isAlive(i, j), false, "cell at (" + i + "," + j + ") is dead");
		});
	});
});

test("testing initialization of 3x3 grid with live cell", function() {
	var smallBoard = Board(3, 3, [GameCoord(1, 2)]);
	from_to(0, 2, function(i) {
		from_to(0, 2, function(j) {
			if (i == 1 && j == 2) {
				equal(smallBoard.isAlive(1, 2), true, "cell at (1,2) is alive");
			} else {
				equal(smallBoard.isAlive(i, j), false, "cell at (" + i + "," + j + ") is dead");
			}
		});
	});
});

test("testing getNumNeighbors with 6x6 grid with live cells at (4,3), (3,4), (5,5)", function() {
	var mediumBoard = Board(6, 6, [GameCoord(4, 3), GameCoord(3, 4), GameCoord(5, 5)]);
	equal(mediumBoard.getNumNeighbors(2, 2), 0, "(2,2) has 0 neighbors");
	equal(mediumBoard.getNumNeighbors(3, 3), 2, "(3,3) has 2 neighbors");
	equal(mediumBoard.getNumNeighbors(4, 3), 1, "verify doesn't count own cell as a neighbor -- (4,3) has 1 neighbors");
	equal(mediumBoard.getNumNeighbors(5, 4), 2, "check edge - (5,4) has 2 neighbors");
	equal(mediumBoard.getNumNeighbors(5, 5), 0, "check corner - (5,5) has 0 neighbors");
});

test("testing getNewBoardState on individual rules", function() {
	var rules = Rules();
	var board = Board(4, 4, [GameCoord(1, 2), GameCoord(2, 2), GameCoord(3, 2)]);
	var next = board.getNewBoardState(rules);
	equal(next.isAlive(0, 2), false, "single neighbor stays dead");
	equal(next.isAlive(1, 2), false, "single neighbor goes from alive to dead");
	equal(next.isAlive(2, 2), true, "two neighbors stays alive");

	board = Board(4, 4, [GameCoord(0, 0), GameCoord(1, 0), GameCoord(0, 1)]);
	next =  board.getNewBoardState(rules);
	equal(next.isAlive(1, 1), true, "three neighbors goes from dead to alive");

	board = Board(4, 4, [GameCoord(0, 0), GameCoord(1, 0), GameCoord(0, 1), GameCoord(1, 1), GameCoord(2, 1)]);
	next = board.getNewBoardState(rules);
	equal(next.isAlive(1, 1), false, "four neighbors goes from alive to dead");
});

test("testing getNewBoardState on blinker (see wikipedia description)", function() {
	var starting = [GameCoord(0, 1), GameCoord(1, 1), GameCoord(2, 1)];
	var result = Board(3, 3, starting).getNewBoardState(Rules());
	from_to(0, 2, function(i) {
		from_to(0, 2, function(j) {
			if (i === 1 && (j === 0 || j === 1 || j === 2)) {
				equal(result.isAlive(i, j), true, "cell at (" + i + "," + j + ") is alive");
			} else {
				equal(result.isAlive(i, j), false, "cell at (" + i + "," + j + ") is dead");
			}
		});
	});
});

test("testing getNewBoardState on toad (see wikipedia description", function() {
	var starting = [GameCoord(0, 1), GameCoord(0, 2), GameCoord(1, 3), GameCoord(2, 0), GameCoord(3, 1), GameCoord(3, 2)];
	var result = Board(4, 4, starting).getNewBoardState(Rules());
	from_to(0, 3, function(i) {
		from_to(0, 3, function(j) {
			if ((j === 1 && (i === 1 || i === 2 || i === 3)) || (j === 2 && (i === 0 || i === 1 || i === 2))) {
				equal(result.isAlive(i, j), true, "cell at (" + i + "," + j + ") is alive");
			} else {
				equal(result.isAlive(i, j), false, "cell at (" + i + "," + j + ") is dead");
			}
		});
	});
});