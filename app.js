'use strict';
// Module Dependencies
// -------------------
//require('newrelic');
var express = require('express');
var http = require('http');
var JWT = require('./lib/jwtDecoder');
var path = require('path');
var request = require('request');
var routes = require('./routes');
var activity = require('./routes/activity');
var trigger = require('./routes/trigger');

var app = express();

// Register configs for the environments where the app functions
// , these can be stored in a separate file using a module like config
var APIKeys = {
	appId: '6a06f983-40af-465a-af58-53de828168f3',
	clientId: 'e69z9puj6x8pqeg2h7rns363',
	clientSecret: 'nYm6PEFdVqEFr5fNCnvAPfMB',
	appSignature: 'jbrtf22b1nc2zqqlfcgwhekknp5juiv4r4rxpjqzk4dueipyiczyg20mocwjzzxzrrpqy2al24ayqdb3byz0shtfndnezeji4gbs1nqdyejprdo30vt1cs3b1fos2wxgyetb5kha5e3yghvewq4lh0bsrjc2dn2oblns1op0shmrcrweekwwnngszt3nthcvvo00q2ylkhgosaoo3j3ez1m0xl2ycaxvxa1tj52c045rqr34gafg53weussg2ur',
	authUrl: 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1'
};

// Simple custom middleware
function tokenFromJWT(req, res, next) {
	// Setup the signature for decoding the JWT
	var jwt = new JWT({
		appSignature: APIKeys.appSignature
	});

	// Object representing the data in the JWT
	var jwtData = jwt.decode(req);

	// Bolt the data we need to make this call onto the session.
	// Since the UI for this app is only used as a management console,
	// we can get away with this. Otherwise, you should use a
	// persistent storage system and manage tokens properly with
	// node-fuel
	req.session.token = jwtData.token;
	next();
}

/**
THIS IS A WORKAROUND FOR A KNOWN BUG, DO NOT USE THIS CODE IN PRODUCTION
**/
function workaround(req, res, next) {
	if ('POST' !== req.method) {
		next();
	}

	if ('/login' === req.url || '/fireEvent/helloWorld' === req.url || '/fireEvent/updateContact' === req.url) {
		next();
	}

	if (
		'/ixn/activities/hello-world/save/' === req.url ||
		'/ixn/activities/hello-world/execute/' === req.url ||
		'/ixn/activities/hello-world/publish/' === req.url ||
		'/ixn/activities/hello-world/validate/' === req.url ||
		'/ixn/activities/update-contact/save/' === req.url ||
		'/ixn/activities/update-contact/execute/' === req.url ||
		'/ixn/activities/update-contact/publish/' === req.url ||
		'/ixn/activities/update-contact/validate/' === req.url
	) {
		var buf = '';
		req.on('data', function(chunk) {
			buf += chunk;
		});

		req.on('end', function() {
			try {
				var faultyJSON = /"", *}/;
				// Cleanup Jira: JB-5249
				if (buf.match(faultyJSON)) {
					req.body = buf.replace(faultyJSON, '""}');
				}
				next();
			} catch (err) {
				console.error('ERROR: ', err);
				next(err);
			}
			next();
		});
	}
}

// Use the cookie-based session  middleware
app.use(express.cookieParser());

// TODO: MaxAge for cookie based on token exp?
app.use(express.cookieSession({
	secret: "HelloWorld-CookieSecret"
}));

// Configure Express
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(workaround);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.favicon());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// HubExchange Routes
app.get('/', routes.index);
app.post('/login', tokenFromJWT, routes.login);
app.post('/logout', routes.logout);

// Custom Hello World Activity Routes
app.post('/ixn/activities/hello-world/save/', activity.save);
app.post('/ixn/activities/hello-world/validate/', activity.validate);
app.post('/ixn/activities/hello-world/publish/', activity.publish);
app.post('/ixn/activities/hello-world/execute/', activity.execute);
app.post('/ixn/activities/update-contact/save/', activity.save);
app.post('/ixn/activities/update-contact/validate/', activity.validate);
app.post('/ixn/activities/update-contact/publish/', activity.publish);
app.post('/ixn/activities/update-contact/execute/', activity.execute);

// Custom Hello World Trigger Route
app.post('/ixn/triggers/hello-world/', trigger.edit);

// Abstract Event Handler
app.post('/fireEvent/:type', function(req, res) {
	var data = req.body;
	var triggerIdFromAppExtensionInAppCenter = 'jb-hello-world-trigger-ccorwin';
	var JB_EVENT_API = 'https://www.exacttargetapis.com/interaction-experimental/v1/events';
	var reqOpts = {};

	if ('helloWorld' !== req.params.type) {
		res.send(400, 'Unknown route param: "' + req.params.type + '"');
	} else {
		// Hydrate the request
		reqOpts = {
			url: JB_EVENT_API,
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + req.session.token
			},
			body: JSON.stringify({
				ContactKey: data.alternativeEmail,
				EventDefinitionKey: triggerIdFromAppExtensionInAppCenter,
				Data: data
			})
		};

		request(reqOpts, function(error, response, body) {
			if (error) {
				console.error('ERROR: ', error);
				res.send(response, 400, error);
			} else {
				res.send(body, 200, response);
			}
		}.bind(this));
	}
});

app.get('/clearList', function(req, res) {
	// The client makes this request to get the data
	activity.logExecuteData = [];
	res.send(200);
});


// Used to populate events which have reached the activity in the interaction we created
app.get('/getActivityData', function(req, res) {
	// The client makes this request to get the data
	if (!activity.logExecuteData.length) {
		res.send(200, {
			data: null
		});
	} else {
		res.send(200, {
			data: activity.logExecuteData
		});
	}
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});