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
	var bodyElement = document.getElementsByTagName('body')[0];
	bodyElement.parentNode.appendChild(jqueryScript, bodyElement);




	var jqueryUiScript = document.createElement('script');
	jqueryUiScript.type = 'text/javascript';
	jqueryUiScript.async = false;
	jqueryUiScript.src = "http://code.jquery.com/ui/1.10.4/jquery-ui.js";
	var bodyElement = document.getElementsByTagName('body')[0];
	bodyElement.parentNode.appendChild(jqueryUiScript, bodyElement);


	var scrollToScript = document.createElement('script');
	scrollToScript.type = 'text/javascript';
	scrollToScript.async = false;
	scrollToScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/jquery.scrollTo.js";
	var bodyElement = document.getElementsByTagName('body')[0];
	bodyElement.parentNode.appendChild(scrollToScript, bodyElement);


	var nudgeScript = document.createElement('script');
	nudgeScript.type = 'text/javascript';
	nudgeScript.async = false;
	nudgeScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/nudge.js";
	var bodyElement = document.getElementsByTagName('body')[0];
	bodyElement.parentNode.appendChild(nudgeScript, bodyElement);


	var stockScript = document.createElement('script');
	stockScript.type = 'text/javascript';
	stockScript.async = false;
	stockScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/vendor/stock.js";
	var bodyElement = document.getElementsByTagName('body')[0];
	bodyElement.parentNode.appendChild(stockScript, bodyElement);


	var mainScript = document.createElement('script');
	mainScript.type = 'text/javascript';
	mainScript.async = false;
	mainScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/main.js";
	var bodyElement = document.getElementsByTagName('body')[0];
	bodyElement.parentNode.appendChild(mainScript, bodyElement);




	var rpdScript = document.createElement('script');
	rpdScript.type = 'text/javascript';
	rpdScript.async = false;
	rpdScript.src = "file:/Users/ccorwin/floobits/share/chriscorwin/RPD/js/rpd.js";
	var bodyElement = document.getElementsByTagName('body')[0];
	bodyElement.parentNode.appendChild(rpdScript, bodyElement);






})();