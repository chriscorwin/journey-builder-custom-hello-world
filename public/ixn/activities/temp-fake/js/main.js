requirejs.config({
	paths: {
		vendor: '../vendor',
		postmonger: 'vendor/postmonger'
	},
	shim: {
		'vendor/jquery.min': {
			exports: '$'
		},
		'TempFake': {
			deps: ['vendor/jquery.min', 'vendor/postmonger']
		}
	}
});

requirejs(['vendor/jquery.min', 'TempFake'], function($, TempFake) {
	//console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function(err) {
	//console.log( "REQUIRE ERROR: ", err );
	if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules);
	}

	throw err;
};