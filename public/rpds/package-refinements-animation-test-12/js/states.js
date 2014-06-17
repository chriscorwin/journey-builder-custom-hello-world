window.states

function States(name, version) {
	this.name = name.toString()
	this.version = version.toString()
	this.rootElementSelector = '#root'
}
States.prototype.getName = function() {
	return this.name
}
States.prototype.getVersion = function() {
	return this.version
}
States.prototype.setVersion = function(version) {
	this.version = version
}
States.prototype.getRootElementSelector = function() {
	return this.rootElementSelector
}
States.prototype.setRootElementSelector = function(selector) {
	this.rootElementSelector = selector
}


States.prototype.executeFunctionByName = function(functionName, context) {
	var args = Array.prototype.slice.call(arguments, 2);
	console.group("[executeFunctionByName] args", args);
	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	try {
		// may throw three exceptions
		if (typeof context[func] === "function") {
			// safe to use the function
			console.groupEnd();
			return context[func].apply(context, args);
		} else {
			console.warn("[executeFunctionByName] was passed `" + functionName + "` but it is not a function we can find.");
		}
	} catch (e) {
		// statements to handle any unspecified exceptions
		// console.error(e); // pass exception object to error handler
	} finally {
		console.groupEnd();
	}
};



var runStates = function runStates() {
	console.group("[runStates] executing now...")
	var rootElement = "#root"
	if ($("title").text() === "WebCode Document") {
		rootElement = "body"
	}


	console.groupEnd()

	return new States('Package Refinements', '8')

}




var timeoutID = window.setTimeout(function() {
	states = runStates()
}, 1)