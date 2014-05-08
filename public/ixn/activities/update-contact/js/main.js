requirejs.config({
	paths: {
		vendor: '../vendor',
		othervendor: '../js/vendor',
		postmonger: 'vendor/postmonger'
	},
	shim: {
		'vendor/jquery.min': {
			exports: '$'
		},
		'UpdateContact': {
			deps: ['vendor/jquery.min', 'vendor/postmonger', 'othervendor/handlebars-v1.3.0', 'othervendor/underscore', 'othervendor/bootstrap', 'othervendor/mousetrap.min', 'othervendor/nudge', 'othervendor/ba-debug.min', 'stock', 'rpd']
		}
	}
});

requirejs(['vendor/jquery.min', 'UpdateContact'], function($, UpdateContact) {
	console.log('REQUIRE LOADED');
});

requirejs.onError = function(err) {
	console.log("REQUIRE ERROR: ", err);
	if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules);
	}

	throw err;
};