var Initialize = function(sizeX, sizeY) {

	var that = Object.create(Initialize.prototype);

	var id = getParam('id');

	var getRandomInitialConditions = function(factor) {
		factor = (typeof factor !== 'undefined') ? factor : 0.1;
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

	that.getInitialConditions = getRandomInitialConditions;

	return that;
};