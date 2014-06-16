javascript: (function() {


	var headElement = document.getElementsByTagName('head')[0];


	var bodyElement = document.getElementsByTagName('body')[0];


	var bootstrapStylesheetLink = document.createElement('link');
	bootstrapStylesheetLink.rel = 'stylesheet';
	bootstrapStylesheetLink.href = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/css/bootstrap.css";
	headElement.appendChild(bootstrapStylesheetLink, headElement);


	var bootstrapThemeStylesheetLink = document.createElement('link');
	bootstrapThemeStylesheetLink.rel = 'stylesheet';
	bootstrapThemeStylesheetLink.href = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/css/bootstrap-theme.min.css";
	headElement.appendChild(bootstrapThemeStylesheetLink, headElement);


	var mainStylesheetLink = document.createElement('link');
	mainStylesheetLink.rel = 'stylesheet';
	mainStylesheetLink.href = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/css/main.css";
	headElement.appendChild(mainStylesheetLink, headElement);


	var debugScript = document.createElement('script');
	debugScript.type = 'text/javascript';
	debugScript.async = false;
	debugScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/ba-debug.min.js";
	bodyElement.parentNode.appendChild(debugScript, bodyElement);


	var handlebarsScript = document.createElement('script');
	handlebarsScript.type = 'text/javascript';
	handlebarsScript.async = false;
	handlebarsScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/handlebars-v1.3.0.js";
	bodyElement.parentNode.appendChild(handlebarsScript, bodyElement);


	var jqueryScript = document.createElement('script');
	jqueryScript.type = 'text/javascript';
	jqueryScript.async = false;
	jqueryScript.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js";
	bodyElement.parentNode.appendChild(jqueryScript, bodyElement);


	var underscoreScript = document.createElement('script');
	underscoreScript.type = 'text/javascript';
	underscoreScript.async = false;
	underscoreScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/bower_components/underscore/underscore.js";
	bodyElement.parentNode.appendChild(underscoreScript, bodyElement);



	var underscoreStringScript = document.createElement('script');
	underscoreStringScript.type = 'text/javascript';
	underscoreStringScript.async = false;
	underscoreStringScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/underscore.string.js";
	bodyElement.parentNode.appendChild(underscoreStringScript, bodyElement);


	var velocityScript = document.createElement('script');
	velocityScript.type = 'text/javascript';
	velocityScript.async = false;
	velocityScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/jquery.velocity.min.js";
	bodyElement.parentNode.appendChild(velocityScript, bodyElement);


	var velocityUiScript = document.createElement('script');
	velocityUiScript.type = 'text/javascript';
	velocityUiScript.async = false;
	velocityUiScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/velocity.ui.js";
	bodyElement.parentNode.appendChild(velocityUiScript, bodyElement);


	var velocityExtrasUiScript = document.createElement('script');
	velocityExtrasUiScript.type = 'text/javascript';
	velocityExtrasUiScript.async = false;
	velocityExtrasUiScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/velocity.extras.ui.js";
	bodyElement.parentNode.appendChild(velocityExtrasUiScript, bodyElement);


	var scrollToScript = document.createElement('script');
	scrollToScript.type = 'text/javascript';
	scrollToScript.async = false;
	scrollToScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/jquery.scrollTo.js";
	bodyElement.parentNode.appendChild(scrollToScript, bodyElement);


	var nudgeScript = document.createElement('script');
	nudgeScript.type = 'text/javascript';
	nudgeScript.async = false;
	nudgeScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/nudge.js";
	bodyElement.parentNode.appendChild(nudgeScript, bodyElement);


	var statesScript = document.createElement('script');
	statesScript.type = 'text/javascript';
	statesScript.async = false;
	statesScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/states.js";
	bodyElement.parentNode.appendChild(statesScript, bodyElement);
})();