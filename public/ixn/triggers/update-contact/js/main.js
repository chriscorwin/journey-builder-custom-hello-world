requirejs.config({
	paths: {
		vendor: '../vendor',
		postmonger: 'vendor/postmonger'
	},
	shim: {
		'vendor/jquery.min': {
			exports: '$'
		},
		'updateContactTrigger': {
			deps: ['vendor/jquery.min', 'vendor/postmonger']
		}
	}
});

requirejs(['vendor/jquery.min', 'updateContactTrigger'], function($, updateContactTrigger) {
	//console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function(err) {
	//console.log( "REQUIRE ERROR: ", err );
	if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules);
	}

	throw err;
};