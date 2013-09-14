
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

var each_2d = function(a, f) {
	each(a, function(sub_array) {
		each(sub_array, f);
	});
};

