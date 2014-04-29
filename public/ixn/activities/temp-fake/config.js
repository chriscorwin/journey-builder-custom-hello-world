define([], function() {
	return {
		"icon": "images/jb-icon.jpg",
		"iconSmall": "images/jb-icon.jpg",
		"key": "jb-temp-fake-activity-ccorwin",
		"partnerApiObjectTypeId": "IXN.CustomActivity.REST",
		"lang": {
			"en-US": {
				"name": "Temp Fake (ccorwin)",
				"description": "Activity simply posts the data into an array for display on the App's home page."
			}
		},
		"category": "messaging",
		"version": "1.0",
		"apiVersion": "1.0",
		"execute": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/temp-fake/execute/",
			"inArguments": [],
			"outArguments": [],
			"verb": "POST",
			"body": "",
			"format": "json",
			"useJwt": false,
			"timeout": 3000
		},
		"save": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/temp-fake/save/",
			"verb": "POST",
			"body": "",
			"format": "json",
			"useJwt": false,
			"timeout": 3000
		},
		"publish": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/temp-fake/publish/",
			"verb": "POST",
			"body": "",
			"format": "json",
			"useJwt": false,
			"timeout": 3000
		},
		"validate": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/temp-fake/validate/",
			"verb": "POST",
			"body": "",
			"format": "json",
			"useJwt": false,
			"timeout": 3000
		},

		"edit": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/temp-fake/",
			"height": 400,
			"width": 500
		}
	};
});