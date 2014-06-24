var test = function test(e) {};

var $jbDays;

var $firstJbDay;

var $otherJbDays;

var activityWidth;

var zeroWidth;

var zeroNewWidth;

var primaryActivitiesAnimationDelay = 0;
var primaryActivitiesAnimationDuration = (950);
var primaryActivitiesAnimationEasing = [.42, 0, .58, 1];
var bounce = false;

// bounce = true;
if (bounce === true) {
	var primaryActivitiesAnimationDuration = (2200);
	var primaryActivitiesAnimationEasing = [900, 20];

}


var secondaryActivitiesAnimationDelay = 0;
var secondaryActivitiesAnimationDuration = primaryActivitiesAnimationDuration;
var secondaryActivitiesAnimationEasing = primaryActivitiesAnimationEasing;


var tertiaryActivitiesAnimationDelay = primaryActivitiesAnimationDuration;
var tertiaryActivitiesAnimationDuration = 0;
var tertiaryActivitiesAnimationEasing = 0;

var executeFunctionByName = function executeFunctionByName(functionName, context) {
	var args = Array.prototype.slice.call(arguments, 2);
	// console.log("[executeFunctionByName]");
	// console.log("args: %o", args);
	// console.warn("[executeFunctionByName] functionName before split: " + functionName);
	var namespaces = functionName.split(".");
	// console.warn("[executeFunctionByName] namespaces: " + namespaces);
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	try {
		// may throw three exceptions
		// console.warn("[executeFunctionByName] trying, functionName: " + functionName);
		// console.warn("[executeFunctionByName] trying, func: " + func);
		if (typeof context[func] === "function") {
			// safe to use the function
			return context[func].apply(context, args);
		} else {
			// console.warn("[executeFunctionByName] was passed `" + functionName + "` but it is not a function we can find.");
			// console.warn("[executeFunctionByName] was passed `" + func + "` but it is not a function we can find.");
		}
	} catch (e) {
		// statements to handle any unspecified exceptions
		// console.error(e); // pass exception object to error handler
	} finally {
		// console.warn("[executeFunctionByName] finished.");
		// console.groupEnd();
	}
};

// console.setLevel(5);
/**
 * Turns someCrazyName into Some Crazy Name
 * Decent job of acroynyms:
 * ABCAcryonym => ABC Acryoynm
 * xmlHTTPRequest => Xml HTTP Request
 */
String.prototype.unCamelCase = function() {
	return this.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3").replace(/^./, function(str) {
		return str.toUpperCase();
	});
};

String.prototype.endsWith = function(value) {
	if (this.length < value.length) {
		return false;
	} else {
		return Boolean(this.substr(this.length - value.length, value.length + 1) === value);
	}
};

String.prototype.contains = function(value, caseFlag) {
	if (this.length < value.length) {
		return false;
	} else {
		var regExPattern_value = caseFlag === false ? new RegExp(value, "i") : new RegExp(value);
		return Boolean(this.match(regExPattern_value));
	}
};

String.prototype.beginsWith = function(string) {
	return this.indexOf(string) === 0;
};

var isArray = function isArray(o) {
	return Object.prototype.toString.call(o) === "[object Array]";
};

// var hide = function hide(el) {
// 	$("body").hasClass("dev");
// 	if ($("body").hasClass("dev")) {
// 		return;
// 	}
// 	var thisElement = el,
// 		thisElementID = "",
// 		$thisElement, $hiddenNodes;
// 	if (el instanceof jQuery === true) {
// 		thisElementID = el.attr("id");
// 		$thisElement = el;
// 		thisElement = thisElementID;
// 	} else if (isArray(el)) {
// 		$.each(el, function(index, value) {
// 			hide(value);
// 		});
// 		return;
// 	} else {
// 		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
// 			thisElementID = "#" + el;
// 			$thisElement = $(thisElementID);
// 		} else {
// 			$thisElement = $(thisElement);
// 			thisElementID = $thisElement.attr("id");
// 		}
// 	}
// 	$thisElement.addClass("pleaseHide");
// 	$thisElement.velocity("fadeOut", {
// 		translateZ: 0,
// 		stagger: true,
// 		drag: true,
// 		duration: 125
// 	}, {
// 		/* Logs all the animated divs. */
// 		complete: function(elements) {}
// 	});
// };

var hide = function hide(el) {
	$("body").hasClass("dev");
	if ($("body").hasClass("dev")) {
		return;
	}
	// console.group("[hide]", el.toString());
	var thisElement = el,
		thisElementID = "",
		thisElementName = "",
		$thisElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// console.log('Element is a jQuery instance');
		thisElementID = el.attr("id");
		$thisElement = el;
		thisElement = thisElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			// console.debug("[hide] el.isArray, value:", value);
			hide(value);
		});
		return;
	} else {
		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			thisElementName = "[data-name='" + el + "']";
			if ($(thisElementID).length !== 0) {
				$thisElement = $(thisElementID);
			} else if ($(thisElementName).length !== 0) {
				// console.debug("thisElementName", thisElementName);
				$thisElement = $(thisElementName);
			}
		} else if (typeof el === "string" && el.beginsWith("#") === true) {
			thisElementID = el;
			thisElementName = "[data-name='" + el + "']";
			if ($(thisElementID).length !== 0) {
				$thisElement = $('#' + thisElementID);
			} else if ($(thisElementName).length !== 0) {
				// console.debug("thisElementName", thisElementName);
				$thisElement = $(thisElementName);
			}
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}

	if ($thisElement.length === 0) {
		// console.groupEnd();
		return;
	} else {

		// console.debug("$thisElement (#" + thisElementID + ")", $thisElement);

		if ($thisElement.hasClass("activityBar") === true) {
			// console.log('hiding activity bar!', thisElementID);

			$thisElement.addClass("pleaseHide");

			var newWidth = 10;
			// console.debug("newWidth", newWidth);

			$thisElement.velocity({
				translateZ: 0,
				opacity: 0,
				width: (newWidth + 'px')
			}, {
				display: 'none',
				queue: false,
				duration: ((secondaryActivitiesAnimationDuration - (secondaryActivitiesAnimationDuration / 7)) / 2),
				easing: secondaryActivitiesAnimationEasing,
				delay: secondaryActivitiesAnimationDelay
			});


		} else if ($thisElement.hasClass("activityIcon") === true) {
			// console.log('hiding activity icon!', thisElementID);
			var initialWidth = $thisElement.width();

			// console.debug("$thisElement.css('width')", $thisElement.css('width'));

			$thisElement.velocity("transition.shrinkOut", {
				stagger: 75,
				drag: true,
				duration: 75
			}, {
				// Logs all the animated divs. 
				complete: function(elements) {
					// console.log(elements);
					$thisElement.addClass("pleaseHide");

				}
			});

		} else if ($thisElement.hasClass("verticalBar") === true) {
			// console.log('hiding activity bar!');
			var initialHeight = $thisElement.height();
			$thisElement.velocity("transition.slideDownOut", {
				stagger: 75,
				drag: true,
				duration: 125
			}, {
				/* Logs all the animated divs. */
				complete: function(elements) {
					// console.log(elements);
				}
			});
			$thisElement.addClass("pleaseHide");



		} else {
			$thisElement.velocity("fadeOut", {
				stagger: false,
				drag: false,
				duration: 125
			}, {
				/* Logs all the animated divs. */
				complete: function(elements) {}
			});
		}

		if ($thisElement.data("event-onhide") == "trigger") {
			thisElementName = $thisElement.data("name");
			$thisElement.trigger("hide", {
				elementID: thisElementID,
				elementName: thisElementName
			});
		}

	}

	// console.groupEnd();

};


var showModalOverlay = function showModalOverlay(el) {
	$("#overlay____ismodaloverlay___startshidden").velocity("fadeIn", {
		duration: (primaryActivitiesAnimationDuration / 3),
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})
	$("body").addClass("modalIsShowing")
};

var hideModalOverlay = function hideModalOverlay(el) {
	// doTheModalOverlayHide()
	$("body").removeClass("modalIsShowing")
	window.setTimeout(doTheModalOverlayHide, 125)
};

var doTheModalOverlayHide = function doTheModalOverlayHide() {
	// console.log("hiding overlay")
	$("#overlay____ismodaloverlay___startshidden").velocity("fadeOut", {
		duration: (primaryActivitiesAnimationDuration / 3),
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})
};

var adjustActivitiesForDuration1 = function adjustActivitiesForDuration1(el) {
	// var $activityStuffExceptInitial = $(".activityBar:not(.initial), .activityIcon:not(.initial), .activityIcon.initial.end, .verticalBar")
	$(".activityBar:not(.initial), .activityIcon:not(.initial), .activityIcon.initial.end, .verticalBar").velocity({
		left: "+=" + (activityWidth + (activityWidth / 2)) + "px"
	}, {
		duration: primaryActivitiesAnimationDuration,
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})


	$("#dayHeader0____uicentered").velocity({
		left: "13.438%"
	}, {
		duration: primaryActivitiesAnimationDuration,
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})


	$("#day0").velocity({
		width: "160px"
	}, {
		duration: primaryActivitiesAnimationDuration,
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})


	$("#day1").velocity({
		width: "300px",
		left: "631px"
	}, {
		duration: primaryActivitiesAnimationDuration,
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})


	$('[data-name="jbDays"]').children().not(".day0, .day1").velocity({
		left: "-=" + 100 + "px"
	}, {
		duration: primaryActivitiesAnimationDuration,
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})


	$("#dayHeader1____uicentered").velocity({
		left: "93.2125px"
	}, {
		duration: primaryActivitiesAnimationDuration,
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})


	$("#emailActivityBar____activityBar").velocity({
		width: "113px"
	}, {
		duration: primaryActivitiesAnimationDuration,
		easing: primaryActivitiesAnimationEasing,
		delay: primaryActivitiesAnimationDelay,
	})

	fixActivityBarsLabels($("#emailActivityBar____activityBar"), activityWidth, 113)
};


var rpdShow = function rpdShow(el) {
	$("body").hasClass("dev");
	if ($("body").hasClass("dev")) {
		return;
	}
	// console.group("[rpdShow]", el.toString());
	var thisElement = el,
		thisElementID = "",
		thisElementName = "",
		$thisElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// console.log('Element is a jQuery instance');
		thisElementID = el.attr("id");
		$thisElement = el;
		thisElement = thisElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			// console.debug("[rpdShow] el.isArray, value:", value);
			rpdShow(value);
		});
		return;
	} else {
		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			thisElementName = "[data-name='" + el + "']";
			if ($(thisElementID).length !== 0) {
				$thisElement = $(thisElementID);
			} else if ($(thisElementName).length !== 0) {
				// console.debug("thisElementName", thisElementName);
				$thisElement = $(thisElementName);
			}
		} else if (typeof el === "string" && el.beginsWith("#") === true) {
			thisElementID = el;
			thisElementName = "[data-name='" + el + "']";
			if ($(thisElementID).length !== 0) {
				$thisElement = $('#' + thisElementID);
			} else if ($(thisElementName).length !== 0) {
				// console.debug("thisElementName", thisElementName);
				$thisElement = $(thisElementName);
			}
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}

	if ($thisElement.length === 0) {
		// console.groupEnd();
		return;
	} else {

		// console.debug("$thisElement (#" + thisElementID + ")", $thisElement);

		if ($thisElement.hasClass("activityBar") === true) {

			var initialWidth = $thisElement.width();

			// console.debug("$thisElement.css('width')", $thisElement.css('width'));
			$thisElement.removeClass("pleaseHide");

			var numberOfTimes = 3;
			// console.debug("numberOfTimes", numberOfTimes);
			// console.debug("thisElementID", thisElementID);
			var lookForElementID = $(".activityBar:not(.pleaseHide):last").attr("id");
			var someClassNames = $("#" + lookForElementID).attr("class");
			// console.debug("lookForElementID", lookForElementID);
			// console.debug("someClassNames", someClassNames);
			if (typeof lookForElementID !== "undefined" && lookForElementID !== thisElementID) {
				// if ($('.activityBar:not(.pleaseHide):last').attr('id') === thisElementID) {
				numberOfTimes = 3;
				// console.debug("numberOfTimes", numberOfTimes);
			}
			var newWidth = (activityWidth * numberOfTimes) + Math.ceil(activityWidth / numberOfTimes)
			// console.debug("newWidth", newWidth);

			$thisElement.velocity({
				translateZ: 0,
				opacity: [1],
				width: [(newWidth + 'px'), secondaryActivitiesAnimationEasing, '10px']
			}, {
				display: 'block',
				queue: false,
				duration: (secondaryActivitiesAnimationDuration - 175),
				// duration: (secondaryActivitiesAnimationDuration - (secondaryActivitiesAnimationDuration / 7)),
				easing: secondaryActivitiesAnimationEasing,
				delay: (secondaryActivitiesAnimationDelay + 125)
			});


		} else if ($thisElement.hasClass("activityIcon") === true) {
			// console.log('showing activity icon!', thisElementID);
			var initialWidth = $thisElement.width();

			// console.debug("$thisElement.css('width')", $thisElement.css('width'));

			$thisElement.velocity("transition.shrinkIn", {
				stagger: 75,
				drag: true,
				duration: 125
			}, {
				// Logs all the animated divs. 
				complete: function(elements) {
					// console.log(elements);
					$thisElement.removeClass("pleaseHide");

				}
			});

		} else if ($thisElement.hasClass("verticalBar") === true) {
			// console.log('showing activity bar!');
			var initialHeight = $thisElement.height();
			$thisElement.velocity("transition.slideDownIn", {
				stagger: 75,
				drag: true,
				duration: 125
			}, {
				/* Logs all the animated divs. */
				complete: function(elements) {
					// console.log(elements);
				}
			});
			$thisElement.removeClass("pleaseHide");



		} else {
			$thisElement.velocity("fadeIn", {
				translateZ: 0,
				stagger: 250,
				drag: true,
				duration: 250
			}, {
				/* Logs all the animated divs. */
				complete: function(elements) {

					if ($thisElement.data("event-onshow") == "trigger") {
						thisElementName = $thisElement.data("name");
						$thisElement.trigger("rpdShow", {
							elementID: thisElementID,
							elementName: thisElementName
						});
					}
				}
			});
		}
	}

	if ($thisElement.data("event-onshow") == "trigger") {
		thisElementName = $thisElement.data("name");
		$thisElement.trigger("rpdShow", {
			elementID: thisElementID,
			elementName: thisElementName
		});
	}
	// console.groupEnd();

};

var rpdFadeOut = function rpdFadeOut( /* args */ ) {
	if ($("body").hasClass("dev")) {
		return;
	}
	var args = Array.prototype.slice.call(arguments, 0);
	// console.group("[rpdFadeOut]");
	window.rpdFadeOutArgs = args;
	var elementToFadeOutID = rpdFadeOutArgs[0][0]["elementID"];
	// console.debug("elementToFadeOutID", elementToFadeOutID);

	if (typeof elementToFadeOutID === "string" && elementToFadeOutID.beginsWith("#") === false && elementToFadeOutID.beginsWith(".") === false) {
		elementToFadeOutID = "#" + elementToFadeOutID;
	}


	// console.debug("elementToFadeOutID", elementToFadeOutID);

	$(elementToFadeOutID).velocity("callout.tadaThenFadeOut");
	// console.groupEnd();
};

var toggle = function toggle(el) {
	$("body").hasClass("dev");
	if ($("body").hasClass("dev")) {
		return;
	}
	var thisElement = el,
		thisElementID = "",
		$thisElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		thisElementID = el.attr("id");
		$thisElement = el;
		thisElement = thisElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			toggle(value);
		});
		return;
	} else {
		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			$thisElement = $(thisElementID);
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}
	if ($thisElement.hasClass("pleaseHide")) {
		rpdShow(thisElementID);
	} else {
		hide(thisElementID);
	}
};

var showDeep = function showDeep(el) {
	$("body").hasClass("dev");
	if ($("body").hasClass("dev")) {
		return;
	}
	// console.group('[showDeep]', el);
	var thisElement = el,
		thisElementID = "",
		$thisElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		thisElementID = el.attr("id");
		$thisElement = el;
		thisElement = thisElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			// console.debug("[showDee] (isArray) value: ", value);
			rpdShow(value);
		});
		return;
	} else {
		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			$thisElement = $(thisElementID);
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}
	rpdShow($thisElement.attr('id'));
	// $thisElement.hasClass('pleaseHide');
	// $thisElement.rpdShow();
	$hiddenNodes = $thisElement.children(":not(.startshidden)");
	// console.debug("$hiddenNodes", $hiddenNodes);
	$hiddenNodes.each(function(index, value) {

		// console.debug("hiddenNodes: ", $hiddenNodes);
		rpdShow($(this).attr('id'));
	});
	// rpdShow($hiddenNodes);
	// $hiddenNodes.each(function(i, node) {
	// 	showDeep($(node).attr("id"));
	// });
	showPopupsInElement(thisElementID);
	// console.groupEnd();
};

var showState = function showState(el) {
	$("body").hasClass("dev");
	if ($("body").hasClass("dev")) {
		return;
	}
	// console.group("[showState]", el);
	var thisElement = el,
		thisElementID = "",
		$thisElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		thisElementID = el.attr("id");
		$thisElement = el;
		thisElement = thisElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			// console.group("...will now showDeep on " + value);
			showDeep(value);
		});
		return;
	} else {
		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			$thisElement = $(thisElementID);
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}
	// console.debug("$thisElement", $thisElement);
	rpdShow($thisElement.attr('id'));
	// $thisElement.hasClass('pleaseHide');
	// $thisElement.rpdShow();
	// console.debug("$thisElement.children(':not(.startshidden)')", $thisElement.children(':not(.startshidden)'));
	// $thisElement.children(":not(.startshidden)").trigger('show');
	$hiddenNodes = $thisElement.children(":not(.startshidden)");
	// console.debug("$hiddenNodes", $hiddenNodes);
	$hiddenNodes.each(function(index, value) {
		// console.group("...will now showDeep on " + $(this));
		showDeep($(this).attr('id'));
	});
	// showDeep($hiddenNodes)
	// $hiddenNodes.each(function(i, node) {
	// 	showDeep($(node).attr("id"));
	// });
	showPopupsInElement(thisElementID);
};

var hideDeep = function hideDeep(el) {
	$("body").hasClass("dev");
	if ($("body").hasClass("dev")) {
		return;
	}
	var thisElement = el,
		thisElementID = "",
		$thisElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		thisElementID = el.attr("id");
		$thisElement = el;
		thisElement = thisElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			showDeep(value);
		});
		return;
	} else {
		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			$thisElement = $(thisElementID);
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}
	hide($thisElement);
	// $thisElement.velocity("fadeOut", {
	// 	stagger: 100,
	// 	drag: true,
	// 	duration: 125
	// }, {
	// 	
	// })
	// $thisElement.addClass("hide").hide();
	hidePopupsInElement(thisElementID);
};

var hideState = function hideState(el) {
	if ($("body").hasClass("dev")) {
		return;
	}
	var modalIsShowing = false;
	if ($("body").hasClass("modalIsShowing")) {
		console.log("modal is showing, delay more")
		modalIsShowing = true;
	}
	var thisElement = el,
		thisElementID = "",
		$thisElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		thisElementID = el.attr("id");
		$thisElement = el;
		thisElement = thisElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			showDeep(value);
		});
		return;
	} else {
		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			$thisElement = $(thisElementID);
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}
	$("[data-event-onhide]", thisElementID).trigger('hide')
	hidePopupsInElement(thisElementID);
	var transitionToUse = "transition.slideRightOut";
	var velocityOptions = {
		stagger: 100,
		drag: true,
		duration: 250, 
		complete: function(){
		}
	}
	if (modalIsShowing === true) {
		// console.log("modal is showing, go slooower")
		transitionToUse = "fadeOut"
		velocityOptions.stagger = 1200
		velocityOptions.drag = true
		velocityOptions.duration = 125
		$thisElement.velocity({opacity: 0}, {
			delay: 125,
			display: false
		});
		
	} else {
		$thisElement.velocity(transitionToUse, velocityOptions);
	}

	// $thisElement.addClass("hide").hide();
};

var showPopupsInElement = function showPopupsInElement(el) {
	return;
	$('body').hasClass('dev');
	if ($('body').hasClass('dev')) {
		return;
	}
	var theElement = el,
		theElementId = '',
		$theElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// console.debug("showPopupsInElement Argument passed in is an instance of jQuery!");
		theElementId = el.attr('id');
		$theElement = el;
		theElement = theElementId;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			showDeep(value);
		});
		return;
	} else {
		// console.debug("showPopupsInElement Is not an array, is not a jQuery object....");
		// console.debug("showPopupsInElement el", el);
		if (el.beginsWith('#') === false && el.beginsWith('.') === false) {
			// console.debug("showPopupsInElement Does not begin with # nor .");
			theElementId = "#" + el;
			// console.debug("showPopupsInElement theElementId", theElementId);
			$theElement = $(theElementId);
		} else {
			$theElement = $(theElement)
			theElementId = $theElement.attr('id')
		}
	}
	var $popupToShow = $theElement.find('.is_popup');
	if ($popupToShow.length !== 0) {
		var popupToShowID = $theElement.find('.is_popup').attr('id');

		rpdShow(popupToShowID);


		_.delay(function(event) {


			var $elementToScrollTo = $popupToShow.find('div[id*="popup"]');
			var elementToScrollToID = $elementToScrollTo.attr('id');


			// console.log("$elementToScrollTo.attr('id')", $elementToScrollTo.attr('id'));
			// console.log("$elementToScrollTo.offset().top", $elementToScrollTo.offset().top);
			// console.log("$elementToScrollTo.offset().left", $elementToScrollTo.offset().left);

			var rootElement = '.canvas-scroll-pane';
			if ($('title').text() === 'WebCode Document') {
				rootElement = 'body';
			}

			var newTop = ($elementToScrollTo.offset().top);
			var newLeft = ($elementToScrollTo.offset().left);


			// $(rootElement).scrollTo({
			// 	top: ($elementToScrollTo.offset().top),
			// 	left: $elementToScrollTo.offset().left + 300
			// }, 125);

			var offsetTop = $(rootElement).height() / 4;
			// console.log("offsetTop", (offsetTop * -1));
			var offsetLeft = $(rootElement).width() / 4;
			// console.log("offsetLeft", (offsetLeft * -1));
			var elementToScrollToWidth = $elementToScrollTo.width();


			$(rootElement).scrollTo('#' + elementToScrollToID, {
				duration: 250,
				offset: {
					top: (offsetTop * -1),
					left: (((offsetLeft) * -1) + (elementToScrollToWidth / 4))
				}
			});

		}, 500, event);
	}



};

var hidePopupsInElement = function hidePopupsInElement(el) {
	return;
	$("body").hasClass("dev");
	if ($("body").hasClass("dev")) {
		return;
	}
	// console.group("[hide]", el.toString());
	var thisElement = el,
		thisElementID = "",
		thisElementName = "",
		$thisElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// console.log('Element is a jQuery instance');
		thisElementID = el.attr("id");
		$thisElement = el;
		thisElement = thisElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			// console.debug("[hide] el.isArray, value:", value);
			hide(value);
		});
		return;
	} else {
		if (typeof el === "string" && el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			thisElementName = "[data-name='" + el + "']";
			if ($(thisElementID).length !== 0) {
				$thisElement = $(thisElementID);
			} else if ($(thisElementName).length !== 0) {
				// console.debug("thisElementName", thisElementName);
				$thisElement = $(thisElementName);
			}
		} else if (typeof el === "string" && el.beginsWith("#") === true) {
			thisElementID = el;
			thisElementName = "[data-name='" + el + "']";
			if ($(thisElementID).length !== 0) {
				$thisElement = $(thisElementID);
			} else if ($(thisElementName).length !== 0) {
				// console.debug("thisElementName", thisElementName);
				$thisElement = $(thisElementName);
			}
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}

	if ($thisElement.length === 0) {
		// console.groupEnd();
		return;
	} else {

		var $popupToShow = $thisElement.find('.is_popup');
		if ($popupToShow.length !== 0) {
			var popupToHideID = $thisElement.find('.is_popup').attr('id');

			hide(popupToHideID)
		}
		// $thisElement.find('.group.is_popup').addClass('hide').hide();
	}


};

var copyToClipboard = copyToClipboard || function copyToClipboard() {
		window.prompt("Copy and paste this into console to get source:", "copy(rpdNodes);");
	};

var printHTML = printHTML || function printHTML() {
		window.rpdNodes = $("body").html();
		copyToClipboard();
	};

var getElementName = function getElementName(someString) {
	return splitIntoParams(someString).name;
};

var getClassNames = function getClassNames(someString) {
	return splitIntoParams(someString).classNames;
};

var getRpdClassNames = function getRpdClassNames(someString) {
	return splitIntoParams(someString).rpdClassNames;
};

var splitIntoParams = function splitIntoParams(someString) {
	var toReturn = {
		name: "",
		classNames: [],
		rpdClassNames: [],
		id: ""
	}, someStringSplit1 = [],
		someStringSplit2 = [],
		someStringSplit3 = [],
		someStringSplit4 = [],
		someStringSplitRPD = [],
		thisElementClassNames = [],
		thisElementRpdClassNames = [],
		thisElementName;
	// thisElementName = getElementName(someString);
	// console.group("[splitIntoParams]: " + someString);
	//first replace all the ____ with a marker
	var tokens = "::::";
	var lookFor4 = /____/gi;
	var lookFor3 = /___/gi;
	var lookForRPD = /rpd__/gi;
	var lookFor2 = /__/gi;
	var replaceWith4 = tokens + "DIVIDER4" + tokens;
	var replaceWith3 = tokens + "DIVIDER3" + tokens;
	var replaceWithRPD = tokens + "DIVIDERRPD" + tokens;
	var replaceWith2 = tokens + "DIVIDER2" + tokens;
	var modifiedString = someString;
	var modifiedString3 = "";
	modifiedString = modifiedString.replace(lookFor4, replaceWith4);
	modifiedString = modifiedString.replace(lookFor3, replaceWith3);
	modifiedString = modifiedString.replace(lookForRPD, replaceWithRPD);
	modifiedString = modifiedString.replace(lookFor2, replaceWith2);
	// console.debug("modifiedString", modifiedString);
	someStringSplit4 = modifiedString.split(replaceWith4);
	// console.debug("someStringSplit4" + someStringSplit4, someStringSplit4.length);
	if (someStringSplit4.length == 2) {
		// if it is more than 1 length, it has a name, grab that name, and we will work with the rest
		// console.debug("someStringSplit4: ", someStringSplit4, someStringSplit4.length);
		thisElementName = someStringSplit4[0];
		modifiedString = someStringSplit4[1];
	} else {
		thisElementName = someString;
	}
	// console.debug("thisElementName", thisElementName);
	toReturn.name = thisElementName;
	someStringSplit3 = modifiedString.split(replaceWith3);
	if (someStringSplit3.length > 0) {
		//now loop through our new array and grab all items from it when do not contain tokens --- these will be classNames
		$.each(someStringSplit3, function(index, value) {
			// console.group('each on someStringSplit3');
			// console.debug(index, value);
			if (value.contains(tokens)) {
				// this thing needs more splitting, do it later
				modifiedString3 += value;
			} else {
				// this is a likely candidate for a classname
				thisElementClassNames.push(value);
			}
		});
	}
	if (modifiedString3.length !== 0 && modifiedString3.contains(replaceWithRPD)) {
		// this has RPD params in it
		modifiedString2 = modifiedString3.replace(replaceWithRPD, "");
		// console.debug("modifiedString2: ", modifiedString2);
		someStringSplitRPD = modifiedString2.split(replaceWith2);
	} else {}
	if (typeof someStringSplitRPD === "object" && someStringSplitRPD.length > 0) {
		$.each(someStringSplitRPD, function(index, value) {
			thisElementRpdClassNames.push(value);
		});
		toReturn.rpdClassNames = thisElementRpdClassNames;
	}
	if (thisElementClassNames.length > 0) {
		// console.debug("thisElementClassNames: ", thisElementClassNames, thisElementClassNames.length);
		toReturn.classNames = thisElementClassNames;
	} else {}
	// console.debug("toReturn", toReturn);
	// console.groupEnd();
	return toReturn;
};

var applyClassNamesToElement = function applyClassNamesToElement(e, pseudoParams) {
	var $thisElement = $(e);
	var isAncestor = false;
	var existingClassNames = $thisElement.attr("class") || "";
	var classNames = "";
	if (pseudoParams.length >= 1) {
		// console.group('applyClassNamesToElement');
		// console.debug("pseudoParams: " + pseudoParams);
		var ancestorIndex = pseudoParams.indexOf("ancestor");
		if (ancestorIndex !== -1) {
			isAncestor = true;
		}
		$.each(pseudoParams, function(index, value) {
			// console.debug("value", value);
			classNames = classNames + " " + value;
		});
		var cleanedExistingClassNames = existingClassNames;
		var cleanedClassNames = classNames;
		cleanedExistingClassNames = cleanedExistingClassNames.replace("ancestor", "");
		cleanedClassNames = cleanedClassNames.replace("ancestor", "");
		$thisElement.attr("class", cleanedClassNames + " " + cleanedExistingClassNames);
		if (isAncestor) {
			// console.warn('isAncestor');
			// console.warn("cleanedClassNames", cleanedClassNames);
			// console.warn("cleanedExistingClassNames", cleanedExistingClassNames);
			$thisElement.addClass("ancestor");
			$thisElement.attr("data-ancestor", "true");
			$thisElement.attr("data-original-classnames", existingClassNames);
			$thisElement.attr("data-applied-classnames", classNames);
			$thisElement.children().attr("class", cleanedClassNames + " " + cleanedExistingClassNames).attr("data-descendant-of", "#" + $thisElement.attr("id"));
		}
	}
};

var applyRdpClassNamesToElement = function applyRdpClassNamesToElement(e, pseudoParams) {
	var $thisElement = $(e);
	var isAncestor = false;
	var existingClassNames = $thisElement.attr("class") || "";
	var classNames = "";
	var dataAttributes = {};
	if ($thisElement.hasClass("ancestor")) {
		isAncestor = true;
	}
	if (pseudoParams.length >= 1) {
		// console.group('applyRdpClassNamesToElement');
		// console.debug("pseudoParams: " + pseudoParams);
		$.each(pseudoParams, function(index, value) {
			if (value.contains("_") === true) {
				var valueSplit = value.split("_");
				if (valueSplit.length === 1) {} else if (valueSplit.length === 2) {} else if (valueSplit.length === 3) {} else if (valueSplit.length >= 4) {}
			}
			if (value.beginsWith("onclick_") === true) {
				// the pattern is onclick_actionToTake_onWhatItemName
				var clickStatementArray = value.split("_");
				if (clickStatementArray.length === 3) {
					var theEvent = clickStatementArray[0];
					var actionToTake = clickStatementArray[1];
					var onWhatItemName = clickStatementArray[2];
				}
				if (onWhatItemName === "next") {
					// console.debug("onWhatItemName", onWhatItemName);
					var $thisElementParentState = $thisElement.closest(".state");
					var $thisElementNextState = $thisElementParentState.next("div[id^='state___']");
					var thisElementNextStateID = $thisElementNextState.attr("id");
					var thisElementNextStateName = splitIntoParams(thisElementNextStateID).name;
					// onWhatItemName = $thisElementNextState.data('name');
					// console.debug("$thisElementParentState.attr('id')", $thisElementParentState.attr('id'));
					// console.debug("thisElementNextStateID", thisElementNextStateID);
					// console.debug("thisElementNextStateName", thisElementNextStateName);
					onWhatItemName = thisElementNextStateName;
				}
				// if (actionToTake === 'gotostate') {
				// 	stateToGoTo = $('#state___' + onWhatItemName).attr('id');
				// 	classNames = classNames + ' ' + 'gotostate';
				// 	dataAttributes['data-target-next'] = stateToGoTo;
				// } else {
				// 	// stateToGoTo = $('#state___' + onWhatItemName).attr('id');
				// }
				classNames = classNames + " " + theEvent;
				classNames = classNames + " " + actionToTake;
				classNames = classNames + " " + onWhatItemName;
				classNames = classNames + " " + theEvent + "-" + actionToTake + "-" + onWhatItemName;
				dataAttributes["data-event-" + theEvent] = actionToTake;
				if (onWhatItemName === "thisname") {
					var potentialName = getElementName($thisElement.attr("id"));
				}
				dataAttributes["data-target-" + actionToTake] = onWhatItemName;
			} else if (value.beginsWith("draggable") === true) {
				// the pattern is onclick2_actionToTake_onWhatItemName
				var clickStatementArray = value.split("_");
				if (clickStatementArray.length === 3) {
					var theEvent = clickStatementArray[0];
					var actionToTake = clickStatementArray[1];
					var onWhatItemName = clickStatementArray[2];
				}
				classNames = classNames + " " + theEvent;
				classNames = classNames + " " + actionToTake;
				classNames = classNames + " " + onWhatItemName;
				classNames = classNames + " " + theEvent + "-" + actionToTake + "-" + onWhatItemName;
				dataAttributes["data-event-" + theEvent] = actionToTake;
				if (onWhatItemName === "thisname") {
					var potentialName = getElementName($thisElement.attr("id"));
				}
				dataAttributes["data-target-" + actionToTake] = onWhatItemName;
			} else if (value.beginsWith("on") === true) {
				// the pattern is onclick2_actionToTake_onWhatItemName
				var clickStatementArray = value.split("_");
				if (clickStatementArray.length === 3) {
					var theEvent = clickStatementArray[0];
					var actionToTake = clickStatementArray[1];
					var onWhatItemName = clickStatementArray[2];
				}
				if (onWhatItemName === "next") {
					// console.debug("onWhatItemName", onWhatItemName);
					var $thisElementParentState = $thisElement.closest(".state");
					var $thisElementNextState = $thisElementParentState.next("div[id^='state___']");
					var thisElementNextStateID = $thisElementNextState.attr("id");
					var thisElementNextStateName = splitIntoParams(thisElementNextStateID).name;
					// onWhatItemName = $thisElementNextState.data('name');
					// console.debug("$thisElementParentState.attr('id')", $thisElementParentState.attr('id'));
					// console.debug("thisElementNextStateID", thisElementNextStateID);
					// console.debug("thisElementNextStateName", thisElementNextStateName);
					onWhatItemName = thisElementNextStateName;
				}
				classNames = classNames + " " + theEvent;
				classNames = classNames + " " + actionToTake;
				classNames = classNames + " " + onWhatItemName;
				classNames = classNames + " " + theEvent + "-" + actionToTake + "-" + onWhatItemName;
				dataAttributes["data-event-" + theEvent] = actionToTake;
				if (onWhatItemName === "thisname") {
					var potentialName = getElementName($thisElement.attr("id"));
				}
				dataAttributes["data-target-" + actionToTake] = onWhatItemName;
				// dataAttributes["data-target-" + theEvent + "-" + actionToTake] = onWhatItemName;
			} else if (value.beginsWith("is") === true) {
				// followsOnTwitter____attributesListItem___button___rpd__isdrop_dropson_expressionDropTarget__ondrop_gotostate_configureVIPsTrigger3___hoverIndicator
				// the pattern is onclick2_actionToTake_onWhatItemName
				// 				$thisElement.children().addClass("drops-on-" + elementToDropOn).addClass("draggable").addClass("dropson");
				// 				$("#" + elementToDropOn).attr("data-droppable", "true").attr("data-drop-accepts", ".drops-on-" + elementToDropOn);
				// 				$("#" + elementToDropOn).addClass("droppable").addClass("ui-droppable");
				// 				$thisElement.children().attr("data-target-drop", "#" + elementToDropOn);
				var clickStatementArray = value.split("_");
				if (clickStatementArray.length === 3) {
					var theEvent = clickStatementArray[0];
					var actionToTake = clickStatementArray[1];
					var onWhatItemName = clickStatementArray[2];
				}
				classNames = classNames + " " + theEvent;
				classNames = classNames + " " + actionToTake;
				classNames = classNames + " " + onWhatItemName;
				classNames = classNames + " " + theEvent + "-" + actionToTake + "-" + onWhatItemName;
				dataAttributes["data-event-" + theEvent] = actionToTake;
				if (onWhatItemName === "thisname") {
					var potentialName = getElementName($thisElement.attr("id"));
				}
				dataAttributes["data-target-" + actionToTake] = onWhatItemName;
			} else if (value.beginsWith("chooseoption")) {
				var optionToChoose = value.split("_");
				optionToChoose.shift();
				var dropDownRoot = $thisElement.parents(".dropdown.options").attr("id").split("dropdown___options___").shift().join("");
				optionToChoose = "dropdown___option___ROOT-GOES-HERE___" + optionToChoose.join("_");
				classNames = classNames + " " + "chooseoption";
				dataAttributes["data-target-option"] = optionToChoose;
			} else if (value.beginsWith("gotostate")) {
				var stateToGoTo = value.split("_");
				stateToGoTo.shift();
				stateToGoTo = "state___" + stateToGoTo.join("_");
				classNames = classNames + " " + "gotostate";
				dataAttributes["data-target-next-deprecated"] = stateToGoTo;
			} else {
				if (value.contains("_") === true) {
					var clickStatementArray = value.split("_");
					if (clickStatementArray.length === 2) {
						var paramName = clickStatementArray[0];
						var paramValue = clickStatementArray[1];
						classNames = classNames + " " + paramName;
						classNames = classNames + " " + paramValue;
						classNames = classNames + " " + paramName + "-" + paramValue;
						dataAttributes["data-" + paramName] = paramValue;
					}
				} else {
					classNames = classNames + " " + value;
				}
			}
		});
		var cleanedExistingClassNames = existingClassNames;
		var cleanedClassNames = classNames;
		cleanedExistingClassNames = cleanedExistingClassNames.replace("ancestor", "");
		cleanedClassNames = cleanedClassNames.replace("ancestor", "");
		$thisElement.attr("class", cleanedClassNames + " " + cleanedExistingClassNames);
		if (isAncestor) {
			// console.warn('isAncestor');
			// console.warn("cleanedClassNames", cleanedClassNames);
			// console.warn("cleanedExistingClassNames", cleanedExistingClassNames);
			$thisElement.attr("data-ancestor", "true");
			$thisElement.attr("data-original-classnames", existingClassNames);
			$thisElement.attr("data-applied-rdp-classnames", classNames);
			$thisElement.addClass("ancestor");
			$thisElement.children().attr("class", cleanedClassNames + " " + cleanedExistingClassNames).attr("data-descendant-of", "#" + $thisElement.attr("id"));
		}
		$.each(dataAttributes, function(index, value) {
			$thisElement.attr(index, value);
			if (isAncestor) {
				$thisElement.children().attr(index, value);
			}
		});
	}
};

var proceedToNextState = function proceedToNextState(selectorPattern) {
	$('.state:not(".visiting, .visited, .shared, .final")').first().trigger('visiting')
};

var makeAttributesFromID = function makeAttributesFromID(selectorPattern) {
	var rootElement = "#root";
	if ($("title").text() === "WebCode Document") {
		rootElement = "body";
	}
	$(selectorPattern, rootElement).each(function(i, e) {
		var $thisElement = $(e);
		var thisID, thisElementParams, thisElementName, thisElementClassNames = [],
			thisElementRpdClassNames = [],
			thisElementDataAttributes = {};
		thisID = $thisElement.attr("id");
		if (typeof thisID === "undefined") {
			// only process elements that have an ID attribute
			return true;
		}
		// console.group("[makeAttributesFromID] #" + thisID);
		thisElementParams = splitIntoParams(thisID);
		thisElementName = thisElementParams.name;
		thisElementClassNames = thisElementParams.classNames;
		thisElementRpdClassNames = thisElementParams.rpdClassNames;
		thisElementDataAttributes["data-name"] = thisElementName;
		$thisElement.addClass(thisElementName);
		// console.debug("thisElementName", thisElementName);
		// console.debug("thisElementRpdClassNames", thisElementRpdClassNames, thisElementRpdClassNames.length);
		// console.debug("thisElementClassNames", thisElementClassNames, thisElementClassNames.length);
		applyClassNamesToElement($thisElement, thisElementClassNames);
		applyRdpClassNamesToElement($thisElement, thisElementRpdClassNames);
		$.each(thisElementDataAttributes, function(index, value) {
			// console.debug('index', index);
			// console.debug('value', value);
			$thisElement.attr(index, value);
		});
	});
};

var passChildrenAttributesFromID = function passChildrenAttributesFromID(selectorPattern) {};






var fixActivityBarsLabels = function fixActivityBarsLabels($bars, activityWidth, newWidth) {


	if (newWidth > (activityWidth * 2)) {
		// console.log('more!')
		$bars.each(function() {
			var $thisActivityBar = $(this);
			if ($thisActivityBar.children().find('.activityBarText.text').text() !== '1 day') {
				$thisActivityBar.children().find('.activityBarText.text').velocity('fadeOut', {
					complete: function() {
						$thisActivityBar.children().find('.activityBarText.text').text('1 day').velocity('fadeIn')
					}
				})
			}
		})
	} else {
		// console.log('less!')
		$bars.each(function() {
			var $thisActivityBar = $(this);
			if ($thisActivityBar.children().find('.activityBarText.text').text() !== 'then') {
				$thisActivityBar.children().find('.activityBarText.text').velocity('fadeOut', {
					complete: function() {
						$thisActivityBar.children().find('.activityBarText.text').text('then').velocity('fadeIn')
					}
				})
			}
		})

	}

}

var animateActivityBars = function animateActivityBars(activityWidth, numberOfTimes, adjustActivityBarsBy, passedElementName) {
	var args = Array.prototype.slice.call(arguments, 0);

	// console.group("[animateActivityBars] %O", args);

	var newActivityBarWidth = (((activityWidth * numberOfTimes) - (activityWidth / 2)) + adjustActivityBarsBy);
	// console.debug("numberOfTimes", numberOfTimes);
	// console.debug("newActivityBarWidth", newActivityBarWidth);
	// console.debug("passedElementName", passedElementName);




	// console.debug("$('.activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, .activityBar:visible:last)').last()", $(".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, .activityBar:visible:last)").last());
	var excludeBarID, $theActivityBars, theActivityBarsSelector = ".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor)";
	if ($(".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, .activityBar:visible:last)").last().length !== 0) {
		excludeBarID = "#" + $(".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, .activityBar:visible:last)").last().attr('id');
		theActivityBarsSelector = excludeBarID + ", " + theActivityBarsSelector;
	}
	// console.log('$("' + theActivityBarsSelector + '")');
	$theActivityBars = $(theActivityBarsSelector);

	// console.trace()
	// console.log("%cAcitvity Bars %o is %d long", "color:orange; background:blue; font-size: 16pt", $theActivityBars, $theActivityBars.length);

	// console.debug("args", args);


	fixActivityBarsLabels($theActivityBars, activityWidth, newActivityBarWidth)

	// if (newActivityBarWidth > (activityWidth * 2)) {
	// 	// console.log('more!')
	// 	$theActivityBars.each(function() {
	// 		var $thisActivityBar = $(this);
	// 		if ($thisActivityBar.children().find('.activityBarText.text').text() !== '1 d') {
	// 			$thisActivityBar.children().find('.activityBarText.text').velocity('fadeOut', {
	// 				complete: function() {
	// 					$thisActivityBar.children().find('.activityBarText.text').text('1 d').velocity('fadeIn')
	// 				}
	// 			})
	// 		}
	// 	})
	// } else {
	// 	// console.log('less!')
	// 	$theActivityBars.each(function() {
	// 		var $thisActivityBar = $(this);
	// 		if ($thisActivityBar.children().find('.activityBarText.text').text() !== 'then') {
	// 			$thisActivityBar.children().find('.activityBarText.text').velocity('fadeOut', {
	// 				complete: function() {
	// 					$thisActivityBar.children().find('.activityBarText.text').text('then').velocity('fadeIn')
	// 				}
	// 			})
	// 		}
	// 	})

	// }

	$theActivityBars.velocity({
		properties: {
			translateZ: 0,
			width: newActivityBarWidth
		},
		options: {
			duration: primaryActivitiesAnimationDuration,
			easing: primaryActivitiesAnimationEasing,
			delay: primaryActivitiesAnimationDelay,
			queue: false
		}
	});
	// console.groupEnd()

};




var slideJbDays = function slideJbDays() {
	var args = Array.prototype.slice.call(arguments, 0);
	// console.group("[slideJbDays] %O", args);
	window.slideJbDaysArgs = args;
	var $jbDays = $('[data-name="jbDays"]').children();
	var $firstJbDay = $jbDays.first();
	var $otherJbDays = $jbDays.not(":first");
	var zeroWidth = $firstJbDay.width();
	var numberOfTimes = 2;
	var zeroNewWidth = zeroWidth + activityWidth * numberOfTimes;
	var adjustActivityBarsBy = (numberOfTimes + 1)
	var passedElementName = "none-shall-pass";
	var passedElementID = "none-shall-pass";
	// console.debug("zeroWidth", zeroWidth);
	// console.debug("zeroNewWidth", zeroNewWidth);
	if (_.isUndefined(args[0]) === false) {
		passedElementName = args[0][0]["elementName"];
		passedElementID = args[0][0]["elementID"];
	}



	// console.groupCollapsed("[slideJbDays] animations here:");

	$firstJbDay.velocity({
		properties: {
			translateZ: 0,
			width: zeroNewWidth + 100
		},
		options: {
			duration: 10,
			delay: 0,
			easing: false,
			complete: function() {

			}
		}
	});
	// console.groupEnd();




	switch (passedElementName) {
		case "ucdActivity1":
			// console.group("It is " + passedElementName);
			var newWidth = (activityWidth * numberOfTimes + (activityWidth + 10) + adjustActivityBarsBy);
			// console.debug("numberOfTimes", numberOfTimes);
			// console.debug("newWidth", newWidth);
			$("." + passedElementName + ".activityBar:visible").velocity({
				properties: {
					translateZ: 0,
					width: newWidth
				},
				options: {
					duration: (secondaryActivitiesAnimationDuration / 2),
					easing: secondaryActivitiesAnimationEasing,
					delay: secondaryActivitiesAnimationDelay,
					queue: false
				}
			});
			// console.groupEnd();



			break;

		case "engageSplitActivity1":
			// console.group("It is " + passedElementName);
			var newWidth = (activityWidth * numberOfTimes + (activityWidth + 10) + adjustActivityBarsBy);
			// console.debug("numberOfTimes", numberOfTimes);
			// console.debug("newWidth", newWidth);
			$("." + passedElementName + ".activityBar:visible").velocity({
				properties: {
					translateZ: 0,
					width: newWidth,
					outline: '1px solid limegreen'
				},
				options: {
					duration: (secondaryActivitiesAnimationDuration / 2),
					easing: secondaryActivitiesAnimationEasing,
					delay: secondaryActivitiesAnimationDelay,
					queue: false
				}
			});

			// console.groupEnd();
			break;

		default:
			// console.group("It is " + passedElementName + " (default case).");
			var newWidth = (activityWidth * numberOfTimes * 2 + (activityWidth + 10) + adjustActivityBarsBy);
			// console.debug("numberOfTimes", numberOfTimes);
			// console.debug("newWidth", newWidth);
			// console.debug("adjustActivityBarsBy", adjustActivityBarsBy);
			var $theActivityBars = $("." + passedElementName + "StopsFor.activityBar:visible");
			// console.debug("$theActivityBars", $theActivityBars);
			$theActivityBars.velocity({
				properties: {
					translateZ: 0,
					width: newWidth
				},
				options: {
					duration: (secondaryActivitiesAnimationDuration),
					easing: secondaryActivitiesAnimationEasing,
					delay: secondaryActivitiesAnimationDelay,
					queue: false
				}
			});
			// console.groupEnd();
			break;
	}



	$otherJbDays.velocity({
		properties: {
			translateZ: 0,
			left: "+=" + (activityWidth * numberOfTimes) + "px"
		},
		options: {
			duration: primaryActivitiesAnimationDuration,
			easing: primaryActivitiesAnimationEasing,
			delay: primaryActivitiesAnimationDelay,
			complete: function() {
				$firstJbDay.velocity({
					properties: {
						translateZ: 0,
						width: "-=100px"
					},
					options: {
						duration: 0,
						delay: 0,
						easing: false,
					}
				});
			}
		}
	});



	$(".end.icon:visible").velocity({
		properties: {
			translateZ: 0,
			left: "+=" + (activityWidth * numberOfTimes) + "px"
		},
		options: {
			duration: primaryActivitiesAnimationDuration,
			easing: primaryActivitiesAnimationEasing,
			delay: primaryActivitiesAnimationDelay,
		}
	});



	animateActivityBars(activityWidth, numberOfTimes, adjustActivityBarsBy, passedElementName)


	// var newActivityBarWidth = (((activityWidth * numberOfTimes) - (activityWidth / 2)) + adjustActivityBarsBy);
	// console.debug("numberOfTimes", numberOfTimes);
	// console.debug("newActivityBarWidth", newActivityBarWidth);
	// console.debug("passedElementName", passedElementName);




	// console.debug("$('.activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, .activityBar:visible:last)').last()", $(".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, .activityBar:visible:last)").last());
	// var excludeBarID, $theActivityBars, theActivityBarsSelector = ".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor)";
	// if ($(".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, .activityBar:visible:last)").last().length !== 0) {
	// 	excludeBarID = "#" + $(".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, .activityBar:visible:last)").last().attr('id');
	// 	theActivityBarsSelector = excludeBarID + ", " + theActivityBarsSelector;
	// }
	// console.log('$("' + theActivityBarsSelector + '")');
	// $theActivityBars = $(theActivityBarsSelector);

	// console.trace()
	// console.log("%cAcitvity Bars %o is %d long", "color:orange; background:blue; font-size: 16pt", $theActivityBars, $theActivityBars.length);

	// console.debug("args", args);

	// if (newActivityBarWidth > (activityWidth * 2)) {
	// 	// console.log('more!')
	// 	$theActivityBars.each(function() {
	// 		var $thisActivityBar = $(this);
	// 		if ($thisActivityBar.children().find('.activityBarText.text').text() !== '1 d') {
	// 			$thisActivityBar.children().find('.activityBarText.text').velocity('fadeOut', {
	// 				complete: function() {
	// 					$thisActivityBar.children().find('.activityBarText.text').text('1 d').velocity('fadeIn')
	// 				}
	// 			})
	// 		}
	// 	})
	// } else {
	// 	// console.log('less!')
	// 	$theActivityBars.each(function() {
	// 		var $thisActivityBar = $(this);
	// 		if ($thisActivityBar.children().find('.activityBarText.text').text() !== 'then') {
	// 			$thisActivityBar.children().find('.activityBarText.text').velocity('fadeOut', {
	// 				complete: function() {
	// 					$thisActivityBar.children().find('.activityBarText.text').text('then').velocity('fadeIn')
	// 				}
	// 			})
	// 		}
	// 	})

	// }

	// $theActivityBars.velocity({
	// 	properties: {
	// 		translateZ: 0,
	// 		width: newActivityBarWidth
	// 	},
	// 	options: {
	// 		duration: primaryActivitiesAnimationDuration,
	// 		easing: primaryActivitiesAnimationEasing,
	// 		delay: primaryActivitiesAnimationDelay,
	// 		queue: false
	// 	}
	// });


	var $centeredThing = $(".uicentered", $firstJbDay);
	var centeredThingWidth = $centeredThing.width();
	// this thing gets moved with the first day, so we just have to re-center it
	var centeredThingNewLeft = (zeroNewWidth - zeroWidth) / 2;
	$centeredThing.velocity({
		properties: {
			translateZ: 0,
			left: "+=" + centeredThingNewLeft + "px"
		},
		options: {
			duration: primaryActivitiesAnimationDuration,
			easing: primaryActivitiesAnimationEasing,
			delay: primaryActivitiesAnimationDelay,
			queue: false
		}
	});

	// console.groupEnd();
};




var slideJbDaysBackwards = function slideJbDaysBackwards() {
	var args = Array.prototype.slice.call(arguments, 0);
	// console.group("[slideJbDaysBackwards]");
	// console.debug("[slideJbDaysBackwards] args", args);
	window.slideJbDaysArgs = args;
	var $jbDays = $('[data-name="jbDays"]').children();
	var $firstJbDay = $jbDays.first();
	var $otherJbDays = $jbDays.not(":first");
	var zeroWidth = $firstJbDay.width();
	var numberOfTimes = 2;
	var zeroNewWidth = zeroWidth - activityWidth * numberOfTimes;
	var adjustActivityBarsBy = (numberOfTimes + 1)
	// console.debug("zeroWidth", zeroWidth);
	// console.debug("zeroNewWidth", zeroNewWidth);
	var passedElementName = args[0][0]["elementName"];
	var passedElementID = args[0][0]["elementID"];


	// no "bounce"
	$otherJbDays.velocity({
		properties: {
			translateZ: 0,
			left: "-=" + (activityWidth * numberOfTimes) + "px"
		},
		options: {
			duration: primaryActivitiesAnimationDuration,
			easing: primaryActivitiesAnimationEasing,
			delay: primaryActivitiesAnimationDelay
		}
	});



	// no "bounce"
	$(".end.icon:visible").velocity({
		properties: {
			translateZ: 0,
			left: "-=" + (activityWidth * numberOfTimes) + "px"
		},
		options: {
			duration: primaryActivitiesAnimationDuration,
			easing: primaryActivitiesAnimationEasing,
			delay: primaryActivitiesAnimationDelay
			// delay: 250
		}
	});



	var $centeredThing = $(".uicentered", $firstJbDay);
	var centeredThingWidth = $centeredThing.width();
	// this thing gets moved with the first day, so we just have to re-center it
	var centeredThingNewLeft = (zeroNewWidth - zeroWidth) / 2;
	// console.debug("centeredThingNewLeft", centeredThingNewLeft);
	$centeredThing.velocity({
		properties: {
			translateZ: 0,
			left: "+=" + (centeredThingNewLeft) + "px"
		},
		options: {
			duration: primaryActivitiesAnimationDuration,
			easing: primaryActivitiesAnimationEasing,
			delay: primaryActivitiesAnimationDelay,
			// delay: 250
		}
	});


	animateActivityBars(activityWidth, numberOfTimes, adjustActivityBarsBy, passedElementName)

	// var newActivityBarWidth = ((activityWidth * numberOfTimes - activityWidth / 2) + adjustActivityBarsBy);
	// // var newActivityBarWidth = ((activityWidth * numberOfTimes) - ((activityWidth / 2) + 10));
	// console.debug("numberOfTimes", numberOfTimes);
	// console.debug("newActivityBarWidth", newActivityBarWidth);
	// console.debug("passedElementName", passedElementName);
	// var excludeBarID = $(".activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, :last)").last().attr("id");
	// var $theActivityBars = $("#" + excludeBarID + ", .activityBar:not(." + passedElementName + ", ." + passedElementName + "StopsFor, :last)");
	// // var $theActivityBars = $("#" + excludeBarID + ", .activityBar:visible:not(." + passedElementName + ", ." + passedElementName + "StopsFor, :last)");
	// console.debug("$theActivityBars", $theActivityBars);
	// $theActivityBars.velocity({
	// 	properties: {
	// 		translateZ: 0,
	// 		width: newActivityBarWidth
	// 	},
	// 	options: {
	// 		duration: primaryActivitiesAnimationDuration,
	// 		easing: primaryActivitiesAnimationEasing,
	// 		delay: primaryActivitiesAnimationDelay,
	// 		// delay: 250
	// 	}
	// });



	var $theActivityBars2 = $(".activityBar." + passedElementName + ", .activityBar." + passedElementName + "StopsFor, .activityBar:last");
	var newActivityBarWidth2 = ((activityWidth * numberOfTimes) + (activityWidth) + adjustActivityBarsBy);

	fixActivityBarsLabels($theActivityBars2, activityWidth, newActivityBarWidth2)


	// console.debug("$theActivityBars2", $theActivityBars2);
	// console.debug("newActivityBarWidth2", newActivityBarWidth2);
	$theActivityBars2.velocity({
		properties: {
			translateZ: 0,
			width: (newActivityBarWidth2)
		},
		options: {
			duration: primaryActivitiesAnimationDuration,
			easing: primaryActivitiesAnimationEasing,
			delay: primaryActivitiesAnimationDelay,
		}
	});

	// console.group("[slideJbDaysBackwards] animations here:");

	$firstJbDay.velocity({
		properties: {
			translateZ: 0,
			width: zeroNewWidth
		},
		options: {
			duration: tertiaryActivitiesAnimationDuration,
			easing: tertiaryActivitiesAnimationEasing,
			delay: tertiaryActivitiesAnimationDelay,
			complete: function() {
				switch (passedElementName) {
					case "ucdActivity1":
						// console.group("It is " + passedElementName);
						var newWidth = (activityWidth * numberOfTimes + (activityWidth + 10) + adjustActivityBarsBy);
						// var newWidth = ((activityWidth * numberOfTimes) - ((activityWidth / 2) + 10));
						// console.debug("numberOfTimes", numberOfTimes);
						// console.debug("newWidth", newWidth);
						$("." + passedElementName + ".activityBar").velocity({
							properties: {
								translateZ: 0,
								width: newWidth
							},
							options: {
								duration: primaryActivitiesAnimationDuration,
								easing: primaryActivitiesAnimationEasing,
								delay: primaryActivitiesAnimationDelay,
							}
						});
						// console.groupEnd();
						break;

					case "engageSplitActivity1":
						// console.group("It is " + passedElementName);
						var newWidth = (activityWidth * numberOfTimes + (activityWidth + 10) + adjustActivityBarsBy);
						// var newWidth = ((activityWidth * numberOfTimes) - ((activityWidth / 2) + 10));
						// console.debug("numberOfTimes", numberOfTimes);
						// console.debug("newWidth", newWidth);
						$("." + passedElementName + ".activityBar").velocity({
							properties: {
								translateZ: 0,
								width: newWidth
							},
							options: {
								duration: primaryActivitiesAnimationDuration,
								easing: primaryActivitiesAnimationEasing,
								delay: primaryActivitiesAnimationDelay,
							}
						});
						// $('#ucdActivity1____activitybar').velocity({
						// 	properties: {
						// 		translateZ: 0,
						// 		width: ((activityWidth * 2) - (activityWidth / 4))
						// 	},
						// 	options: {
						// 		duration: 300,
						// 		easing: [.42,0,.58,1],
						// 		delay: 0
						// 	}
						// });
						// console.groupEnd();
						break;

					default:
						// console.group("It is " + passedElementName + " (default case).");
						// var newWidth = activityWidth * numberOfTimes * 2 + (activityWidth + 10);
						// // var newWidth = ((activityWidth * numberOfTimes) - ((activityWidth / 2) + 10));
						// console.debug("numberOfTimes", numberOfTimes);
						// console.debug("newWidth", newWidth);
						// $("." + passedElementName + "StopsFor.activityBar").velocity({
						// 	properties: {
						// 		translateZ: 0,
						// 		width: newWidth
						// 	},
						// 	options: {
						// 		duration: 300,
						// 		easing: [.42,0,.58,1],
						// 		delay: 0
						// 	}
						// });
						// console.groupEnd();
						break;
				}
			}
		}
	});
	// console.groupEnd();


	// $otherJbDays.velocity("move.slideRight", {
	// 	stagger: false,
	// 	drag: false,
	// 	backwards: false,
	// 	
	// });
	// $('#bar1____activitybar___1').velocity({
	// 	width: ('+=' + activityWidth + 'px')
	// }, [250, 15])
	// console.groupEnd();
};



var fixActivityBars = function fixActivityBars() {
	var args = Array.prototype.slice.call(arguments, 0);
	// console.group("[fixActivityBars] %O", args);
	window.fixActivityBarsArgs = args;
	var $jbDays = $('[data-name="jbDays"]').children();
	var $firstJbDay = $jbDays.first();
	var $otherJbDays = $jbDays.not(":first");
	var zeroWidth = $firstJbDay.width();
	var numberOfTimes = 2;
	var zeroNewWidth = zeroWidth + activityWidth * numberOfTimes;
	var adjustActivityBarsBy = (numberOfTimes + 1)
	var passedElementName = "none-shall-pass";
	var passedElementID = "none-shall-pass";
	// console.debug("zeroWidth", zeroWidth);
	// console.debug("zeroNewWidth", zeroNewWidth);
	if (_.isUndefined(args[0]) === false) {
		passedElementName = args[0][0]["elementName"];
		passedElementID = args[0][0]["elementID"];
	}

	animateActivityBars(activityWidth, numberOfTimes, adjustActivityBarsBy, passedElementName)

	// console.groupEnd();
};

var runIt = function runIt() {
	// console.group("[runIt] executing now...");
	var rootElement = "#root";
	if ($("title").text() === "WebCode Document") {
		rootElement = "body";
	}
	// passChildrenAttributesFromID("div[id^='ancestor___']");
	// passChildrenAttributesFromID("div[id*='___ancestor___']");
	makeAttributesFromID("div");
	$("div.ancestor").each(function(index) {
		var $thisElement = $(this);
		var thisElementClasses = $thisElement.attr("class");
		$thisElement.attr("data-archive-class", thisElementClasses);
		$thisElement.attr("class", "");
	});
	$(".hoverIndicator").addClass("startshidden");
	$(".selectedIndicator").addClass("startshidden");
	$("div.dropdown.options").addClass("startshidden");
	$(".startshidden").addClass("pleaseHide");
	$("div[id^='state___']:not(.initial,.shared)").addClass("group").addClass("startshidden");
	$("div[id^='button']").addClass("button").addClass("clickable");
	// $(".button.gotostate").addClass("override-target");
	$("div.button").addClass("btn");
	$("div.button").each(function(index) {
		var $element = $(this);
		var elementID = $element.attr("id");
		var buttonName = $element.attr("id").split("___")[0];
		if (elementID.beginsWith("button___")) {
			buttonName = $element.attr("id").split("___")[1];
		}
		$element.attr("data-button-name", buttonName);
	});
	// $("div.dropson").each(function(index) {
	// 	var $element = $(this);
	// 	$("body").addClass("show-draggable-outlines");
	// 	var elementID = $element.attr("id");
	// 	var buttonName = $element.attr("id").split("___")[0];
	// 	var siblingToShowClassNames = "." + buttonName + ".whendropped_show";
	// 	var siblingToHideClassNames = "." + buttonName + ".whendropped_hide";
	// 	$element.on("dropped", function() {
	// 		// console.log(buttonName + " was dropped!");
	// 		if ($(siblingToHideClassNames).length === 0 === false) {
	// 			hideDeep(siblingToHideClassNames);
	// 		}
	// 		if ($(siblingToShowClassNames).length === 0 === false) {
	// 			showDeep(siblingToShowClassNames);
	// 		}
	// 	});
	// });
	$("div.isdroptarget").each(function(index) {
		var $element = $(this);
		// $("body").addClass("show-draggable-outlines");
		var elementID = $element.attr("id");
		$element.addClass("droppable");
	});
	// $("div.droppable").each(function(index) {
	// 	var $element = $(this);
	// 	var elementID = $element.attr("id");
	// 	var elementName = $element.attr("id").split("___")[0];
	// 	var siblingToShowClassNames = "." + elementName + ".whendropped_show";
	// 	var siblingToHideClassNames = "." + elementName + ".whendropped_hide";
	// 	$element.on("droppedonto", function() {
	// 		// console.log(elementName + " was droppedonto!");
	// 		if ($(siblingToHideClassNames).length === 0 === false) {
	// 			hideDeep(siblingToHideClassNames);
	// 		}
	// 		if ($(siblingToShowClassNames).length === 0 === false) {
	// 			showDeep(siblingToShowClassNames);
	// 		}
	// 	});
	// });
	$("div[id^='state___'].state").each(function(index) {
		var $thisState = $(this);
		var $nextState = $(this).next();
		var $prevState = $(this).prev();
		var thisStateID = $thisState.attr("id");
		var nextStateID = $nextState.attr("id");
		var prevStateID = $prevState.attr("id");
		var onclickActionsNext = "$('#" + nextStateID + "').trigger('gotostate'); ";
		var onclickActionsBack = "$('#" + prevStateID + "').trigger('gotostate'); ";
		$(this).attr("data-toggle", "state").attr("data-target-next", nextStateID).attr("data-target-prev", prevStateID).find(".dropdown:not(.options, .option)").on("click", function(event) {
			var $childDropdown = $(this).next();
			event.stopPropagation();
			toggle($childDropdown);
		}).end().find(".dropdown.options").find(".dropdown.option").on("mouseout", function(event) {}).end().end().find("div.button.back").on("click", function() {}).attr("data-target-next", prevStateID).attr("data-target-prev", nextStateID).attr("onclick", onclickActionsBack).end();
	});
	$(".override-target").each(function(index) {
		var $thisElement = $(this);
		var thisID = $thisElement.attr("id");
		var thisParentStateID = $thisElement.parents("[id^='state___'].state").attr("id");
		var stateToGoTo;
		var theseClassNames = $thisElement.attr("class").split(" ");
		$.each(theseClassNames, function(index, value) {
			if (value.beginsWith("gotostate_")) {
				var stateToGoTo = "state___" + value.split("gotostate_")[1];
				$thisElement.attr("data-target-next", stateToGoTo);
			}
		});
		var nextState = $thisElement.attr("data-target-next");
		var prevState = $thisElement.parents(".state").attr("data-target-prev");
		$thisElement.attr("data-target-prev", prevState);
		if ($thisElement.hasClass("back")) {
			$thisElement.on("click", function() {
				$("#" + thisParentStateID).trigger("unvisit");
				$("#" + thisParentStateID).trigger("deconfigure");
				$("#" + nextState).trigger("visiting");
			});
		} else if ($thisElement.hasClass("next")) {
			$thisElement.on("click", function() {
				$("#" + thisParentStateID).trigger("unvisit");
				$("#" + nextState).trigger("visiting");
			});
		} else {
			$thisElement.on("click", function() {
				$("#" + thisParentStateID).trigger("unvisit");
				$("#" + nextState).trigger("visiting");
			});
		}
		$thisElement.attr("onclick", '/* // console.warn("Click overridden."); */');
	});
	$(".button.custom.choose").each(function(index) {
		var $thisElement = $(this);
		var thisID = $thisElement.attr("id");
		var thisParentStateID = $thisElement.parents("[id^='state___'].state").attr("id");
		var stateToGoTo;
		var theseClassNames = $thisElement.attr("class").split(" ");
		$.each(theseClassNames, function(index, value) {
			if (value.beginsWith("gotostate_")) {
				var stateToGoTo = "state___" + value.split("gotostate_")[1];
				$thisElement.attr("data-target-next", stateToGoTo);
			}
		});
		var nextState = $thisElement.attr("data-target-next");
		var prevState = $thisElement.parents(".state").attr("data-target-prev");
		$thisElement.attr("data-target-prev", prevState);
		if ($thisElement.hasClass("back")) {
			$thisElement.on("click", function() {
				$("#" + thisParentStateID).trigger("unvisit");
				$("#" + thisParentStateID).trigger("deconfigure");
				$("#" + nextState).trigger("visiting");
			});
		} else if ($thisElement.hasClass("next")) {
			$thisElement.on("click", function() {
				$("#" + thisParentStateID).trigger("unvisit");
				$("#" + nextState).trigger("visiting");
			});
		} else {
			$thisElement.on("click", function() {
				$("#" + thisParentStateID).trigger("unvisit");
				$("#" + nextState).trigger("visiting");
			});
		}
		$thisElement.attr("onclick", '// console.warn("Click overridden.");');
	});
	$(".state").each(function(index, element) {
		$(element).find(".button").first().addClass("default").addClass("first");
		$(element).find(".button").last().addClass("last");
	});
	$(".children_start_hidden").each(function(index, element) {
		$(element).children().addClass("startshidden");
	});
	$(".children_whendropped_show").each(function(index, element) {
		$(element).children().addClass("whendropped_show");
	});
	$(".ungroup_after_init").each(function(index, element) {
		$(element).children().each(function(index2, element2) {
			$(element2).insertAfter("#state___initial");
		});
	});
	$(".starts_hidden").addClass("startshidden").removeClass("starts_hidden").addClass("removed-deprecated-starts_hidden");
	$(".startshidden").velocity("fadeOut", {
		stagger: false,
		drag: false,
		duration: 10
	}).attr("data-startshidden", "true").addClass("pleaseHide");
	// $(".startshidden").addClass("hide").attr('data-startshidden', 'true');
	// $(".startshidden:not(:hidden)").velocity("fadeOut", {
	// 	stagger: false,
	// 	drag: false,
	// 	duration: 125
	// }).attr('data-startshidden', 'true').addClass('pleaseHide');
	$(".state:not(.shared)").on("visiting", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateName = $thisState.attr("data-name");
		var thisStateRoot = thisStateID.split("___")[1];
		// showDeep(thisStateID);
		showState(thisStateID);
		$("body").attr("data-state-visiting-name", thisStateName);
		$("body").attr("data-state-visiting-id", thisStateID);
		$(".state:not('#" + thisStateID + "')").removeClass("visiting").attr("data-visiting", "false");
		$thisState.attr("data-visiting", "true").addClass("visiting");

		$(".icon." + thisStateRoot + ":not(.visited)").addClass('visiting')
		$(".activityBar." + thisStateRoot + ":not(.visited)").addClass('visiting')
		$(".verticalBar." + thisStateRoot + ":not(.visited)").addClass('visiting')

		$(".icon." + thisStateRoot + ":not(.visited)").each(function() {
			$(this).addClass('visiting');
			rpdShow($(this).attr('id'));
		});
		$(".verticalBar." + thisStateRoot + ":not(.visited)").each(function() {
			$(this).addClass('visiting');
			rpdShow($(this).attr('id'));
		});
		$(".activityBar." + thisStateRoot + ":not(.visited)").each(function() {
			$(this).addClass('visiting');
			rpdShow($(this).attr('id'));
		});

		// rpdShow($(".icon." + thisStateRoot + ":not(.visited)"));
		// rpdShow($(".activityBar." + thisStateRoot + ":not(.visited)"));
		// rpdShow($(".verticalBar." + thisStateRoot + ":not(.visited)"));
		// $(".icon." + thisStateRoot + ":not(.visited)").hasClass('pleaseHide').rpdShow();
		if ($thisState.hasClass("visited") === false) {
			$thisState.trigger("visited");
		}
		$(".button.pulseonactivation").removeClass("activated");
		$(".button.pulseonactivation:visible", $thisState).addClass("activated");
	});
	$(".state:not(.shared)").on("unvisit", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateRoot = thisStateID.split("___")[1];
		// console.group("[unvisit] State: " + thisStateRoot);
		hideState(thisStateID);
		$thisState.attr("data-visiting", "false").removeClass("visiting");

		$(".icon." + thisStateRoot + ".visiting:not(.shared)").removeClass('visiting').addClass('visited')
		$(".activityBar." + thisStateRoot + ".visiting:not(.shared)").removeClass('visiting').addClass('visited')
		$(".verticalBar." + thisStateRoot + ".visiting:not(.shared)").removeClass('visiting').addClass('visited')


		hide($(".icon." + thisStateRoot + ".visited"));
		hide($(".activityBar." + thisStateRoot + ".visited"));
		hide($(".verticalBar." + thisStateRoot + ".visited"));
		// console.groupEnd();
	});
	$(".state:not(.shared)").on("gotostate", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		$(".state:not(.shared, [data-visiting='false'])").trigger("unvisit");
		$thisState.trigger("visiting");
	});
	$(".state").on("configure", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateRoot = thisStateID.split("___")[1];
		$thisState.attr("data-configuring", "true").addClass("configuring");
		rpdShow($(".icon." + thisStateRoot + ".configured").attr('id'));
	});
	$(".state:not(.shared)").on("deconfigure", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateRoot = thisStateID.split("___")[1];
		$thisState.attr("data-configuring", "false").removeClass("configuring");
		hide($(".icon." + thisStateRoot + ".visited"));
		hide($(".icon." + thisStateRoot + ".configured"));
	});
	$(".state:not(.shared)").on("visited", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateRoot = thisStateID.split("___")[1];
		$thisState.attr("data-visited", "true").addClass("visited");
	});
	$(".highlight").remove();
	$(".option").on("chooseoption", function(event, thingy) {
		var $thisElement = $(this);
		$thisElement.siblings(".option").each(function() {
			hide($(this));
		});
		rpdShow($thisElement);
		// console.debug("event", event);
		// console.debug("thingy", thingy);
		var $buttonCallingThis = $(thingy.currentTarget);
		// console.debug("$(thingy.currentTarget)", $(thingy.currentTarget));
		var buttonCallingThisName = $buttonCallingThis.attr("data-button-name");
		// console.debug("buttonCallingThisName", buttonCallingThisName);
		// $thisElement.parents().find('.dropdown:not(.option,.options)').trigger('click');
		$thisElement.parents().find(".dropdown:not(.option,.options)").trigger("click").attr("data-option-shown", buttonCallingThisName);
	});
	$(".pane").on("showscope", function(event, thingy) {
		var $thisElement = $(this);
		$thisElement.siblings(".pane").each(function() {
			hide($(this));
		});
		rpdShow($thisElement);
		// console.debug("event", event);
		// console.debug("thingy", thingy);
		var $buttonCallingThis = $(thingy.currentTarget);
		// console.debug("$(thingy.currentTarget)", $(thingy.currentTarget));
		var buttonCallingThisName = $buttonCallingThis.attr("data-button-name");
		// console.debug("buttonCallingThisName", buttonCallingThisName);
		// $thisElement.parents().find('.dropdown:not(.pane,.panes)').trigger('click');
		$thisElement.parents().find(".dropdown:not(.pane,.panes)").trigger("click").attr("data-pane-shown", buttonCallingThisName);
	});
	$('[data-target-triggervent="selfclick"]').on("selfclick", function(event, thingy) {
		var $thisElement = $(this);
		$thisElement.trigger("click", event);
	});
	$(".button.next:not([data-event-onclick])").each(function() {
		var $thisElement = $(this);
		// console.debug($thisElement.attr('id'));
		if ($thisElement.parents("[data-target-next]").length != 0) {
			var thisButtonParentDataTargetNext = $thisElement.parents("[data-target-next]").attr("data-target-next").replace("state___", "");
			$thisElement.attr("data-event-onclick", "gotostate");
			$thisElement.attr("data-target-gotostate", thisButtonParentDataTargetNext);
		}
	});
	$(".button[data-target-gotostate]").each(function() {
		var prevGotoStateValue = $(this).attr("data-target-gotostate");
		$(this).attr("data-target-gotostate", "state." + prevGotoStateValue);
	});
	$(".button").each(function() {
		var $thisElement = $(this);
		var thisElementID = $thisElement.attr("id");
		var thisButtonName = $thisElement.attr("data-button-name");
		var thisElementHoverIndicator = $("." + thisButtonName + ".hoverIndicator").attr("id");
		var $thisElementHoverIndicators = $("." + thisButtonName + ".hoverIndicator");
		var $thisElementSelectedIndicators = $("." + thisButtonName + ".selectedIndicator");
		var thisButtonOnclickEventName = $thisElement.attr("data-event-onclick");
		var thisButtonOnclickEventTargetName = $thisElement.attr("data-target-" + thisButtonOnclickEventName);
		if (thisButtonOnclickEventTargetName === "thisname") {
			var newButtonOnclickEventTargetName = thisButtonName;
			// console.debug("Giving the button thisButtonName a newButtonOnclickEventTargetName: " + newButtonOnclickEventTargetName);
			$thisElement.attr("data-target-" + thisButtonOnclickEventName, thisButtonName);
		}
		$thisElement.on("mouseenter", function() {
			// console.debug("$thisElementHoverIndicators", $thisElementHoverIndicators);
			$thisElementHoverIndicators.velocity("fadeIn", {
				stagger: 100,
				drag: true,
				duration: 125
			});
		}).on("mouseleave", function() {
			$thisElementHoverIndicators.velocity("fadeOut", {
				stagger: 100,
				drag: true,
				duration: 125
			});
		}).on("click", function() {
			$thisElementSelectedIndicators.velocity("fadeIn", {
				stagger: 100,
				drag: true,
				duration: 125
			});
		});
	});
	$("[data-event-onhover]").on("mouseover", function(event) {
		// console.debug("hovered!");
		var $thisElement = $(this);
		var thisButtonOnhoverEventName = $thisElement.attr("data-event-onhover");
		var thisButtonOnhoverEventTargetName = $thisElement.attr("data-target-" + thisButtonOnhoverEventName);
		// console.debug("thisButtonOnhoverEventName", thisButtonOnhoverEventName);
		$("." + thisButtonOnhoverEventTargetName).trigger(thisButtonOnhoverEventName, event);
	});
	$('.button[data-event-onclick]:not(".dropson")').on("click", function(event) {
		// console.debug("clicked!");
		var $thisElement = $(this);
		var thisButtonParentInstance = $thisElement.parents(".instance").attr("id");
		var thisButtonOnclickEventName = $thisElement.attr("data-event-onclick");
		var thisButtonDataClickInstance = $thisElement.attr("data-clickinstance");
		var thisButtonOnclickEventTargetName = $thisElement.attr("data-target-" + thisButtonOnclickEventName);
		var args = Array.prototype.slice.call(arguments, 1);
		// console.debug("[data-event-onshow].on(rpdShow) args", args);
		var $thisElement = $(this);
		var thisButtonEventName = $thisElement.attr("data-event-onshow");
		var thisButtonEventTargetName = $thisElement.attr("data-target-" + thisButtonEventName);
		console.debug("thisButtonOnclickEventName", thisButtonOnclickEventName);
		console.debug("thisButtonOnclickEventTargetName", thisButtonOnclickEventTargetName);
		var thisButtonEventName = $thisElement.attr("data-event-onclick");
		var thisButtonEventTargetName = $thisElement.attr("data-target-" + thisButtonEventName);
		if (typeof thisButtonDataClickInstance !== "undefined") {
			thisButtonParentInstance = "instance___" + thisButtonDataClickInstance;
		}
		if (typeof thisButtonParentInstance !== "undefined") {
			// console.debug("thisButtonParentInstance", thisButtonParentInstance);
			// console.debug("$('." + thisButtonOnclickEventTargetName + "', '#" + thisButtonParentInstance + "')");
			$("." + thisButtonOnclickEventTargetName, "#" + thisButtonParentInstance).trigger(thisButtonOnclickEventName, event);
		} else {
			$("." + thisButtonOnclickEventTargetName).trigger(thisButtonOnclickEventName, event);
		}
		if(thisButtonOnclickEventName === "trigger") {
			// console.log("Going to 'click' on `thisButtonEventTargetName` (" + thisButtonEventTargetName + ")")
			executeFunctionByName(thisButtonEventTargetName, window, args);
		}



	});
	$(".button[data-event-onclick]").on("dropped", function(event) {
		var $thisElement = $(this);
		var thisButtonOnclickEventName = $thisElement.attr("data-event-onclick");
		var thisButtonOnclickEventTargetName = $thisElement.attr("data-target-" + thisButtonOnclickEventName);
		$("." + thisButtonOnclickEventTargetName).trigger(thisButtonOnclickEventName, event);
	});
	$("[data-event-onshow]").on("rpdShow", function() {
		// console.group("[data-event-onshow].on(rpdShow)");
		var args = Array.prototype.slice.call(arguments, 1);
		// console.debug("[data-event-onshow].on(rpdShow) args", args);
		var $thisElement = $(this);
		var thisButtonEventName = $thisElement.attr("data-event-onshow");
		var thisButtonEventTargetName = $thisElement.attr("data-target-" + thisButtonEventName);
		// console.debug("thisButtonEventName", thisButtonEventName);
		// console.debug("thisButtonEventTargetName", thisButtonEventTargetName);
		executeFunctionByName(thisButtonEventTargetName, window, args);
		// console.groupEnd();
	});
	$("[data-event-onhide]").on("hide", function() {
		// console.group("[data-event-onshow].on(rpdShow)");
		var args = Array.prototype.slice.call(arguments, 1);
		// console.debug("[data-event-onshow].on(rpdShow) args", args);
		var $thisElement = $(this);
		var thisButtonEventName = $thisElement.attr("data-event-onhide");
		var thisButtonEventTargetName = $thisElement.attr("data-target-" + thisButtonEventName);
		// console.debug("thisButtonEventName", thisButtonEventName);
		// console.debug("thisButtonEventTargetName", thisButtonEventTargetName);
		executeFunctionByName(thisButtonEventTargetName, window, args);
		// console.groupEnd();
	});
	$(".draggable.dropson").each(function() {
		var $thisElement = $(this);
		var thisElementID = $thisElement.attr("id");
		var thisButtonName = $thisElement.attr("data-button-name");
		var thisElementHoverIndicator = $("." + thisButtonName + ".hoverIndicator").attr("id");
		var $thisElementHoverIndicators = $("." + thisButtonName + ".hoverIndicator");
		var $thisElementSelectedIndicators = $("." + thisButtonName + ".selectedIndicator");
		var thisButtonOnclickEventName = $thisElement.attr("data-event-onclick");
		var thisButtonOnclickEventTargetName = $thisElement.attr("data-target-" + thisButtonOnclickEventName);
		var thisButtonOndropEventName = $thisElement.attr("data-event-ondrop");
		var thisButtonOndropEventTargetName = $thisElement.attr("data-target-" + thisButtonOndropEventName);
		var thisButtonDraggableEventName = $thisElement.attr("data-event-draggable");
		var thisButtonDraggableEventTargetName = $thisElement.attr("data-target-" + thisButtonDraggableEventName);
		var $thisElementDragHelper = $("." + thisButtonName + ".dragHelper");
		var thisElementDragHelperID = $thisElementDragHelper.attr("id");
		$thisElement.attr("data-drag-clone-img", "#" + thisElementDragHelperID);
		var $thisClone = $("#" + thisElementDragHelperID);
		var cloneImg = $thisClone.css("background-image");
		// console.debug("cloneImg", cloneImg);
		// if (document.location.pathname.contains('images') === true) {
		// 	thisImagesDirectoryName = document.location.pathname.split('/')[document.location.pathname.split('/').length - 2];
		// 	cloneImg = cloneImg.replace("url('", '');
		// 	cloneImg = cloneImg.replace("url(", '');
		// 	cloneImg = cloneImg.replace("'')", '');
		// 	cloneImg = cloneImg.replace(")", '');
		// 	cloneImg = cloneImg.split("/")[(cloneImg.split("/").length - 1)];
		// }
		// console.debug("cloneImg 2", cloneImg);
		$("head").append("<style>#" + thisElementID + ":active { background: " + cloneImg + "}</style>");
		// $thisElement.css('background', cloneImg);
		// $thisElement.css('background', 'rgba(0,0,0,0.5)');
		// console.debug("$thisElement.css('width')", $thisElement.css('width'));
		var $dropTarget = $('[data-target-accepts="' + thisButtonName + '"]');
		$dropTarget.addClass("rpdDropTarget");
		// console.debug("$dropTarget", $dropTarget);
		// console.debug("thisElementID", thisElementID);
		$dropTarget.droppable({
			accept: "#" + thisElementID,
			activeClass: "ui-state-default",
			tolerance: "touch",
			drop: function(event, ui) {
				$(this).addClass("ui-state-highlight");
				// .html("Dropped!");
				// console.log('thisButtonOndropEventName', thisButtonOndropEventName);
				$thisElement.trigger("dropped");
			},
			over: function(event, ui) {
				var $thisDropTarget = $(this);
				var thisDropTargetName = $thisDropTarget.attr("data-name");
				var $theseDropTargetHoverIndicators = $('[data-name="' + thisDropTargetName + '"].hoverIndicator');
				$theseDropTargetHoverIndicators.each(function() {
					// console.log("$(this).attr('id')", $(this).attr('id'));
					rpdShow($(this).attr("id"));
				});
			},
			out: function(event, ui) {
				var $thisDropTarget = $(this);
				var thisDropTargetName = $thisDropTarget.attr("data-name");
				var $theseDropTargetHoverIndicators = $('[data-name="' + thisDropTargetName + '"].hoverIndicator');
				$theseDropTargetHoverIndicators.each(function() {
					// console.log("$(this).attr('id')", $(this).attr('id'));
					hide($(this).attr("id"));
				});
			}
		});
		$thisElement.on("click", function(event) {
			// console.log("click!");
			return false;
			event.preventDefault();
		});
	});
	if ($('[data-name="jbDays"]').length != 0) {
		$jbDays = $('[data-name="jbDays"]').children();
		$firstJbDay = $jbDays.first();
		$otherJbDays = $jbDays.not(":first");
		activityWidth = ($firstJbDay.width() / 4);
		// activityWidth = (($firstJbDay.width() / 4) + (($firstJbDay.width() / 4) / 2) / 2);
		zeroWidth = $firstJbDay.width();
		zeroNewWidth = zeroWidth + activityWidth;
	}
	// $('.button.next:visible').css({
	// 	border: '1px solid limegreen'
	// }, 500, function() {
	// 	// Animation complete.
	// 	$('.button.next:visible').css({
	// 		border: '0px solid limegreen'
	// 	}, 500, function() {
	// 		// Animation complete.
	// 		// console.log('done');
	// 		$('.button.next:visible').css({
	// 			border: '1px solid limegreen'
	// 		}, 500, function() {
	// 			// Animation complete.
	// 			$('.button.next:visible').css({
	// 				border: '0px solid limegreen'
	// 			}, 500, function() {
	// 				// Animation complete.
	// 				// console.log('done');
	// 			});
	// 		});
	// 	});
	// });
	// $("#state___1").trigger("visiting");
	// $(".jbday.jbcolumn").each(function(index, value) {
	// 	// console.log(index);
	// 	$(this).velocity({
	// 		left: '+=' + ((activityWidth / 2) * index) + 'px',
	// 		width: '+=' + ((activityWidth / 2)) + 'px'
	// 	})
	// })


	// $(".activityIcon:not(':first')").velocity({
	// 	left: '+=' + (activityWidth / 2) + 'px'
	// })



	// $(".activityBar:not(':first')").velocity({
	// 	left: '+=' + (activityWidth / 2) + 'px'
	// })

	$("#state___initial").trigger("visiting");
	// $("#state___email_preview_1").trigger("visiting");
	if ($("body").hasClass("dev") === true) {} else {
		if (typeof init == "function") {
			init();
		}
	}

	// console.groupEnd();
}

var hideOutlines = function hideOutlines() {
	$("body").removeClass("show-draggable-outlines");
	// console.debug("typeof init", typeof init);
	if (typeof init === "function") {}
};

var timeoutID = window.setTimeout(runIt, window.timeoutLength);

var timeoutIdHideOutlines = window.setTimeout(hideOutlines, 500);