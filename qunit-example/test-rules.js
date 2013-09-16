test("testing isAliveNext", function() {
	var rules = Rules();
	equal(rules.isAliveNext(2, true), true, "alive with 2 neighbors stays alive");
	equal(rules.isAliveNext(3, true), true, "alive with 3 neighbors stays alive");
	equal(rules.isAliveNext(1, true), false, "alive with 1 neighbor becomes dead");
	equal(rules.isAliveNext(4, true), false, "alive with 4 neighbors becomes dead");
	equal(rules.isAliveNext(3, false), true, "dead with 3 neighbors becomes alive");
	equal(rules.isAliveNext(2, false), false, "dead with 2 neighbors stays dead");
	equal(rules.isAliveNext(4, false), false, "dead with 4 neighbors stays dead");
	equal(rules.isAliveNext(-1, true), false, "negative input returns dead");
});