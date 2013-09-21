// Code for iteration abstractions that replace most for-loops
// Code taken from the code in Prof. Jackson's Fall 2013 6.170 lectures
// http://people.csail.mit.edu/dnj/teaching/6170/javascript-live/modules/functions/slides.html
var from_to = function(from, to, f) {
	if (from > to) {
		return;
	}
	f(from);
	from_to(from+1, to, f);
};

var each = function(a, f) {
	from_to(0, a.length-1, function(i) {
		f(a[i]);
	});
};

// Code to get the value of a paramater passed in the URL, similar to index.html?id=1
// Taken from http://ziemecki.net/content/javascript-parsing-url-parameters
var getParam = function(sname) {
	var params = location.search.substr(location.search.indexOf("?")+1);
	var sval = "";
	params = params.split("&");
	// split param and value into individual pieces
	for (var i=0; i<params.length; i++) {
		temp = params[i].split("=");
		if ( temp[0] === sname ) { sval = temp[1]; }
	}
	return sval;
};

// Code to simulate an assertion
// http://stackoverflow.com/questions/15313418/javascript-assert
var assert = function(condition, message) {
	if (!condition) {
		throw message || "Assertion failed";
	}
};
