define([], function() {
	return {
		"icon": "images/update-contact.png",
		"iconSmall": "images/update-contact-small.png",
		"key": "jb-update-contact-activity-ccorwin",
		"partnerApiObjectTypeId": "IXN.CustomActivity.REST",
		"lang": {
			"en-US": {
				"name": "Update Contact (RPD, ccorwin)",
				"description": "Activity simply posts the data into an array for display on the App's home page."
			}
		},
		"category": "messaging",
		"version": "1.0",
		"apiVersion": "1.0",
		"execute": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/update-contact/execute/",
			"inArguments": [],
			"outArguments": [],
			"verb": "POST",
			"body": "",
			"format": "json",
			"useJwt": false,
			"timeout": 3000
		},
		"save": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/update-contact/save/",
			"verb": "POST",
			"body": "",
			"format": "json",
			"useJwt": false,
			"timeout": 3000
		},
		"publish": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/update-contact/publish/",
			"verb": "POST",
			"body": "",
			"format": "json",
			"useJwt": false,
			"timeout": 3000
		},
		"validate": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/update-contact/validate/",
			"verb": "POST",
			"body": "",
			"format": "json",
			"useJwt": false,
			"timeout": 3000
		},

		"edit": {
			"uri": "https://quiet-crag-9311.herokuapp.com/ixn/activities/update-contact/",
			"height": 400,
			"width": 500
		}
	};
});