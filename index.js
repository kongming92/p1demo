
var board = Board();
var rules = Rules();

var stepTime = function() {

};

var repeatStepTime = function() {
	stepTime();
	setTimeout(repeatStepTime, 100);
}



(function() {
	repeatStepTime();
})();