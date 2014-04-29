requirejs.config({
    paths: {
        vendor: '../vendor',
		postmonger: 'vendor/postmonger'
    },
    shim: {
        'vendor/jquery.min': {
            exports: '$'
        },
		'pineRidgeTrigger': {
			deps: ['vendor/jquery.min', 'vendor/postmonger']
		}
    }
});

requirejs( ['vendor/jquery.min', 'pineRidgeTrigger'], function( $, pineRidgeTrigger ) {
	//console.log( 'REQUIRE LOADED' );
});

requirejs.onError = function( err ) {
	//console.log( "REQUIRE ERROR: ", err );
	if( err.requireType === 'timeout' ) {
		console.log( 'modules: ' + err.requireModules );
	}

	throw err;
};
