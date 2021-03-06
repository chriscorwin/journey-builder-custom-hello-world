var test = function test(e) {
	// console.log("test", e);
};

// console.setLevel(5);

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

var hide = function hide(el) {
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
			hide(value);
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
	$thisElement.addClass("hide").hide();
};

var show = function show(el) {
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
			show(value);
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
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}
	$thisElement.removeClass("hide").show();
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
	if ($thisElement.hasClass("hide")) {
		show(thisElementID);
	} else {
		hide(thisElementID);
	}
};

var showDeep = function showDeep(el) {
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
	$thisElement.removeClass("hide");
	$thisElement.show();
	$hiddenNodes = $thisElement.find(".hide:not(.startshidden)");
	$hiddenNodes.each(function(i, node) {
		showDeep($(node).attr("id"));
	});
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
	$thisElement.addClass("hide").hide();
	hidePopupsInElement(thisElementID);
};

var showPopupsInElement = function showPopupsInElement(el) {
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
		if (el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			$thisElement = $(thisElementID);
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}
	$thisElement.find(".group.is_popup").removeClass("hide").show(0, function(event) {
		var $elementToScrollTo = $(this).find('div[id*="popup"]');
		var elementToScrollToID = $elementToScrollTo.attr("id");
		var rootElement = ".canvas-scroll-pane";
		if ($("title").text() === "WebCode Document") {
			rootElement = "body";
		}
		var newTop = $elementToScrollTo.offset().top;
		var newLeft = $elementToScrollTo.offset().left;
		var elementToScrollToWidth = $elementToScrollTo.width();
		newLeft = newLeft - 200;
		if (newLeft <= 0) {
			newLeft = 0;
		}
		var newLeftBy160 = Math.round(newLeft / 160);
		var offsetTop = $(rootElement).height() / 4 * -1;
		var offsetLeft = $(rootElement).width() / 4 * -1;
		if ($("title").text() === "WebCode Document") {
			offsetTop = -200;
		}
		$(rootElement).scrollTo("#" + elementToScrollToID, {
			duration: 500,
			offset: {
				top: offsetTop,
				left: offsetLeft + elementToScrollToWidth / 4
			}
		});
	});
};

var hidePopupsInElement = function hidePopupsInElement(el) {
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
		if (el.beginsWith("#") === false && el.beginsWith(".") === false) {
			thisElementID = "#" + el;
			$thisElement = $(thisElementID);
		} else {
			$thisElement = $(thisElement);
			thisElementID = $thisElement.attr("id");
		}
	}
	$thisElement.find(".group.is_popup").addClass("hide").hide();
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
		name: '',
		classNames: [],
		rpdClassNames: [],
		id: ''
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
	var replaceWith4 = tokens + 'DIVIDER4' + tokens;
	var replaceWith3 = tokens + 'DIVIDER3' + tokens;
	var replaceWithRPD = tokens + 'DIVIDERRPD' + tokens;
	var replaceWith2 = tokens + 'DIVIDER2' + tokens;
	var modifiedString = someString;
	var modifiedString3 = '';

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
			// console.groupEnd();
		});
	}

	if (modifiedString3.length !== 0 && modifiedString3.contains(replaceWithRPD)) {
		// this has RPD params in it
		modifiedString2 = modifiedString3.replace(replaceWithRPD, '');

		// console.debug("modifiedString2: ", modifiedString2);
		someStringSplitRPD = modifiedString2.split(replaceWith2);
		// console.debug("someStringSplitRPD: ", someStringSplitRPD, someStringSplitRPD.length);
	} else {}




	if (typeof someStringSplitRPD === 'object' && someStringSplitRPD.length > 0) {
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

	var existingClassNames = $thisElement.attr('class') || '';
	var classNames = '';
	if (pseudoParams.length >= 1) {
		// console.group('applyClassNamesToElement');
		// console.debug("pseudoParams: " + pseudoParams);

		var ancestorIndex = pseudoParams.indexOf('ancestor');
		if (ancestorIndex !== -1) {
			isAncestor = true;
		}

		$.each(pseudoParams, function(index, value) {
			// console.debug("value", value);
			classNames = classNames + ' ' + value;
		});


		var cleanedExistingClassNames = existingClassNames;
		var cleanedClassNames = classNames;
		cleanedExistingClassNames = cleanedExistingClassNames.replace('ancestor', '');
		cleanedClassNames = cleanedClassNames.replace('ancestor', '');

		$thisElement.attr('class', cleanedClassNames + ' ' + cleanedExistingClassNames);
		if (isAncestor) {
			// console.warn('isAncestor');
			// console.warn("cleanedClassNames", cleanedClassNames);
			// console.warn("cleanedExistingClassNames", cleanedExistingClassNames);
			$thisElement.addClass('ancestor');
			$thisElement.attr('data-ancestor', 'true');
			$thisElement.attr('data-original-classnames', existingClassNames);
			$thisElement.attr('data-applied-classnames', classNames);
			$thisElement.children().attr('class', (cleanedClassNames + ' ' + cleanedExistingClassNames)).attr('data-descendant-of', '#' + $thisElement.attr('id'));
		}


		// console.groupEnd();
	}

};

var applyRdpClassNamesToElement = function applyRdpClassNamesToElement(e, pseudoParams) {
	var $thisElement = $(e);
	var isAncestor = false;
	var existingClassNames = $thisElement.attr('class') || '';
	var classNames = '';
	var dataAttribhutes = {};
	if ($thisElement.hasClass('ancestor')) {
		isAncestor = true;
	}
	if (pseudoParams.length >= 1) {
		// console.group('applyRdpClassNamesToElement');
		// console.debug("pseudoParams: " + pseudoParams);

		$.each(pseudoParams, function(index, value) {

			if (value.contains("_") === true) {
				var valueSplit = value.split('_');
				if (valueSplit.length === 1) {
					// console.log("This is messed up --- how did we even get here?");
				} else if (valueSplit.length === 2) {
					console.debug("value has underscores: " + value);
					console.log("// it has one underscore, it's likely applying a boolean");
				} else if (valueSplit.length === 3) {
					// console.log("// it has two underscores, it's likely needing an action");
				} else if (valueSplit.length >= 4) {
					// console.log("// it has more than three underscores, it's a special case....?");
				}
			}

			if (value.beginsWith("onclick_") === true) {
				// the pattern is onclick_actionToTake_onWhatItemName
				var clickStatementArray = value.split('_');
				if (clickStatementArray.length === 3) {
					var theEvent = clickStatementArray[0];
					var actionToTake = clickStatementArray[1];
					var onWhatItemName = clickStatementArray[2];
				}
				// if (actionToTake === 'gotostate') {
				// 	stateToGoTo = $('#state___' + onWhatItemName).attr('id');
				// 	classNames = classNames + ' ' + 'gotostate';
				// 	dataAttribhutes['data-target-next'] = stateToGoTo;
				// } else {
				// 	// stateToGoTo = $('#state___' + onWhatItemName).attr('id');
				// }
				classNames = classNames + ' ' + theEvent;
				classNames = classNames + ' ' + actionToTake;
				classNames = classNames + ' ' + onWhatItemName;
				classNames = classNames + ' ' + theEvent + '-' + actionToTake + '-' + onWhatItemName;
				dataAttribhutes['data-event-' + theEvent] = actionToTake;
				if (onWhatItemName === 'thisname') {
					var potentialName = getElementName($thisElement.attr('id'));
					// console.debug("potentialName", potentialName);
				}
				dataAttribhutes['data-target-' + actionToTake] = onWhatItemName;
				// console.debug("theEvent", theEvent);
				// console.debug("actionToTake", actionToTake);
				// console.debug("onWhatItemName", onWhatItemName);


			} else if (value.beginsWith("on") === true) {
				// the pattern is onclick2_actionToTake_onWhatItemName
				var clickStatementArray = value.split('_');
				if (clickStatementArray.length === 3) {
					var theEvent = clickStatementArray[0];
					var actionToTake = clickStatementArray[1];
					var onWhatItemName = clickStatementArray[2];
				}
				classNames = classNames + ' ' + theEvent;
				classNames = classNames + ' ' + actionToTake;
				classNames = classNames + ' ' + onWhatItemName;
				classNames = classNames + ' ' + theEvent + '-' + actionToTake + '-' + onWhatItemName;
				dataAttribhutes['data-event-' + theEvent] = actionToTake;
				if (onWhatItemName === 'thisname') {
					var potentialName = getElementName($thisElement.attr('id'));
				}
				dataAttribhutes['data-target-' + actionToTake] = onWhatItemName;
				// console.debug("theEvent", theEvent);
				// console.debug("actionToTake", actionToTake);
				// console.debug("onWhatItemName", onWhatItemName);


			} else if (value.beginsWith("chooseoption")) {
				var optionToChoose = value.split("_");
				optionToChoose.shift();
				var dropDownRoot = $thisElement.parents(".dropdown.options").attr("id").split("dropdown___options___").shift().join("");
				optionToChoose = "dropdown___option___ROOT-GOES-HERE___" + optionToChoose.join("_");

				classNames = classNames + ' ' + 'chooseoption';
				dataAttribhutes['data-target-option'] = optionToChoose;


			} else if (value.beginsWith("gotostate")) {
				var stateToGoTo = value.split("_");
				stateToGoTo.shift();
				stateToGoTo = "state___" + stateToGoTo.join("_");

				classNames = classNames + ' ' + 'gotostate';
				dataAttribhutes['data-target-next-deprecated'] = stateToGoTo;

			} else {
				if (value.contains("_") === true) {

					var clickStatementArray = value.split('_');
					if (clickStatementArray.length === 2) {
						var paramName = clickStatementArray[0];
						var paramValue = clickStatementArray[1];
						classNames = classNames + ' ' + paramName;
						classNames = classNames + ' ' + paramValue;
						classNames = classNames + ' ' + paramName + '-' + paramValue;
						dataAttribhutes['data-' + paramName] = paramValue;
						console.debug("paramName", paramName);
						console.debug("paramValue", paramValue);
					}
				} else {
					classNames = classNames + ' ' + value;
				}

			}

		});



		var cleanedExistingClassNames = existingClassNames;
		var cleanedClassNames = classNames;
		cleanedExistingClassNames = cleanedExistingClassNames.replace('ancestor', '');
		cleanedClassNames = cleanedClassNames.replace('ancestor', '');

		$thisElement.attr('class', cleanedClassNames + ' ' + cleanedExistingClassNames);
		if (isAncestor) {
			// console.warn('isAncestor');
			// console.warn("cleanedClassNames", cleanedClassNames);
			// console.warn("cleanedExistingClassNames", cleanedExistingClassNames);

			$thisElement.attr('data-ancestor', 'true');
			$thisElement.attr('data-original-classnames', existingClassNames);
			$thisElement.attr('data-applied-rdp-classnames', classNames);
			$thisElement.addClass('ancestor');
			$thisElement.children().attr('class', (cleanedClassNames + ' ' + cleanedExistingClassNames)).attr('data-descendant-of', '#' + $thisElement.attr('id'));
		}
		$.each(dataAttribhutes, function(index, value) {
			$thisElement.attr(index, value);
			if (isAncestor) {
				$thisElement.children().attr(index, value);
			}
		});


		// console.groupEnd();

	}

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
		thisElementDataAttributes['data-name'] = thisElementName;

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


		// if ($thisElement.hasClass('ancestor')) {
		// 	var classNames = $thisElement.attr('class').split(' ');
		// 	$.each(classNames, function(index, value) {
		// 		if (value.beginsWith("ancestor")) {} else {
		// 			if (value.beginsWith("dropson_")) {
		// 				var elementToDropOn = value.split("_");
		// 				elementToDropOn.shift();
		// 				elementToDropOn = elementToDropOn.join("_");
		// 				// console.log("elementToDropOn", elementToDropOn);
		// 				$thisElement.children().addClass("drops-on-" + elementToDropOn).addClass("draggable").addClass("dropson");
		// 				$("#" + elementToDropOn).attr("data-droppable", "true").attr("data-drop-accepts", ".drops-on-" + elementToDropOn);
		// 				$("#" + elementToDropOn).addClass("droppable").addClass("ui-droppable");
		// 				$thisElement.children().attr("data-target-drop", "#" + elementToDropOn);
		// 			} else if (value.beginsWith("gotostate")) {
		// 				var stateToGoTo = value.split("_");
		// 				stateToGoTo.shift();
		// 				stateToGoTo.shift();
		// 				stateToGoTo = "state___" + stateToGoTo.join("_");
		// 				$thisElement.children().addClass("gotostate");
		// 				$thisElement.children().attr("data-target-next", stateToGoTo);
		// 			} else if (value.beginsWith("chooseoption")) {
		// 				var optionToChoose = value.split("_");
		// 				optionToChoose.shift();
		// 				var dropDownRoot = $thisElement.parents(".dropdown.options").attr("id").split("dropdown___options___").shift().join("");
		// 				optionToChoose = "dropdown___option___ROOT-GOES-HERE___" + optionToChoose.join("_");
		// 				$thisElement.children().addClass("chooseoption");
		// 				$thisElement.children().attr("data-target-option", optionToChoose);
		// 			} else {
		// 				$thisElement.children().addClass(value);
		// 			}
		// 		}
		// 	});
		// }
		// console.groupEnd();
	});
};


var passChildrenAttributesFromID = function passChildrenAttributesFromID(selectorPattern) {

	// var rootElement = "#root";
	// if ($("title").text() === "WebCode Document") {
	// 	rootElement = "body";
	// }
	// $(selectorPattern, rootElement).each(function(i, e) {
	// 	var $thisElement = $(e);
	// 	var thisID, thisIdSplit1, thisIdSplit2, thisIdSplit3, thisElementName, thisElementType, thisElementClassNames = {}, thisElementRpdClassNames = {}, thisElementDataAttributes = {};
	// 	thisID = $thisElement.attr("id");
	// 	if (typeof thisID === "undefined") {
	// 		// only process elements that have an ID attribute
	// 		return true;
	// 	}
	// 	thisIdSplit1 = thisID.split("____");
	// 	if (thisIdSplit1.length >= 2) {
	// 		// console.debug("[passChildrenAttributesFromID] Element #" + thisID + " has a name");
	// 		thisElementName = thisIdSplit1[0];
	// 		thisIdSplit2 = thisIdSplit1[1].split("___");
	// 	} else {
	// 		thisElementName = thisID;
	// 		thisIdSplit2 = thisID.split("___");
	// 	}
	// 	thisElementDataAttributes['data-name'] = thisElementName;



	// 	// var thisIdSplit2 = thisID.split("___");
	// 	var newClassNames = thisIdSplit2.join(" ");
	// 	// console.log("$thisElement.children()", $thisElement.children());
	// 	$.each(thisIdSplit2, function(index, value) {
	// 		if (value.beginsWith("ancestor")) {} else {
	// 			$thisElement.children().addClass(value);
	// 			if (value.beginsWith("dropson_")) {
	// 				var elementToDropOn = value.split("_");
	// 				elementToDropOn.shift();
	// 				elementToDropOn = elementToDropOn.join("_");
	// 				// console.log("elementToDropOn", elementToDropOn);
	// 				$thisElement.children().addClass("drops-on-" + elementToDropOn).addClass("draggable").addClass("dropson");
	// 				$("#" + elementToDropOn).attr("data-droppable", "true").attr("data-drop-accepts", ".drops-on-" + elementToDropOn);
	// 				$("#" + elementToDropOn).addClass("droppable").addClass("ui-droppable");
	// 				$thisElement.children().attr("data-target-drop", "#" + elementToDropOn);
	// 			} else if (value.beginsWith("gotostate")) {
	// 				var stateToGoTo = value.split("_");
	// 				stateToGoTo.shift();
	// 				stateToGoTo = "state___" + stateToGoTo.join("_");
	// 				$thisElement.children().addClass("gotostate");
	// 				$thisElement.children().attr("data-target-next", stateToGoTo);
	// 			} else if (value.beginsWith("chooseoption")) {
	// 				var optionToChoose = value.split("_");
	// 				optionToChoose.shift();
	// 				var dropDownRoot = $thisElement.parents(".dropdown.options").attr("id").split("dropdown___options___").shift().join("");
	// 				optionToChoose = "dropdown___option___ROOT-GOES-HERE___" + optionToChoose.join("_");
	// 				$thisElement.children().addClass("chooseoption");
	// 				$thisElement.children().attr("data-target-option", optionToChoose);
	// 			} else {
	// 				$thisElement.children().addClass(value);
	// 			}
	// 		}
	// 	});
	// });
};


var runIt = function runIt() {
	var rootElement = "#root";
	if ($("title").text() === "WebCode Document") {
		rootElement = "body";
	}
	// passChildrenAttributesFromID("div[id^='ancestor___']");
	// passChildrenAttributesFromID("div[id*='___ancestor___']");
	makeAttributesFromID("div");
	$("div.ancestor").each(function(index) {
		var $thisElement = $(this);
		var thisElementClasses = $thisElement.attr('class');
		$thisElement.attr('data-archive-class', thisElementClasses);
		$thisElement.attr('class', '');
	});
	$(".hoverIndicator").addClass("startshidden");
	$(".selectedIndicator").addClass("startshidden");
	$("div.dropdown.options").addClass("startshidden");
	$(".startshidden").addClass("hide");
	$("div[id^='state___']:not(.initial,.shared)").addClass("group").addClass("hide");
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
	$("div.dropson").each(function(index) {
		var $element = $(this);
		$("body").addClass("show-draggable-outlines");
		var elementID = $element.attr("id");
		var buttonName = $element.attr("id").split("___")[0];
		var siblingToShowClassNames = "." + buttonName + ".whendropped_show";
		var siblingToHideClassNames = "." + buttonName + ".whendropped_hide";
		$element.on("dropped", function() {
			// console.log(buttonName + " was dropped!");
			if ($(siblingToHideClassNames).length === 0 === false) {
				hideDeep(siblingToHideClassNames);
			}
			if ($(siblingToShowClassNames).length === 0 === false) {
				showDeep(siblingToShowClassNames);
			}
		});
	});
	$("div.droppable").each(function(index) {
		var $element = $(this);
		var elementID = $element.attr("id");
		var elementName = $element.attr("id").split("___")[0];
		var siblingToShowClassNames = "." + elementName + ".whendropped_show";
		var siblingToHideClassNames = "." + elementName + ".whendropped_hide";
		$element.on("droppedonto", function() {
			// console.log(elementName + " was droppedonto!");
			if ($(siblingToHideClassNames).length === 0 === false) {
				hideDeep(siblingToHideClassNames);
			}
			if ($(siblingToShowClassNames).length === 0 === false) {
				showDeep(siblingToShowClassNames);
			}
		});
	});
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
		}).end()
			.find(".dropdown.options")
			.find(".dropdown.option").on("mouseout", function(event) {}).end().end()
			.find("div.button.next:not(.gotostate)").attr("onclick", onclickActionsNext).end()
			.find("div.button.back").on("click", function() {}).attr("data-target-next", prevStateID).attr("data-target-prev", nextStateID).attr("onclick", onclickActionsBack).end();
		// var onclickActionsNext = "$('#" + thisStateID + "').trigger('unvisit'); $('#" + nextStateID + "').trigger('visiting'); ";
		// var onclickActionsBack = "$('#" + prevStateID + "').trigger('visiting'); $('#" + thisStateID + "').trigger('unvisit'); ";
		// $(this).attr("data-toggle", "state").attr("data-target-next", nextStateID).attr("data-target-prev", prevStateID).find(".dropdown:not(.options, .option)").on("click", function(event) {
		// 	var $childDropdown = $(this).next();
		// 	event.stopPropagation();
		// 	toggle($childDropdown);
		// }).end()
		// 	.find(".dropdown.options")
		// 	.find(".dropdown.option").on("mouseout", function(event) {}).end().end()
		// 	.find("div.button.next").on("click", function() {}).attr("data-target-next", nextStateID).attr("data-target-prev", prevStateID).attr("onclick", onclickActionsNext).end()
		// 	.find("div.button.back").on("click", function() {}).attr("data-target-next", prevStateID).attr("data-target-prev", nextStateID).attr("onclick", onclickActionsBack).end();
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
		$(element)
			.find(".button").first().addClass("default").addClass("first");
		$(element)
			.find(".button").last().addClass("last");
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
	$(".startshidden").addClass("hide").attr('data-startshidden', 'true');
	$(".startshidden").addClass("hide").attr('data-startshidden', 'true');

	$(".hide").hide();
	$(".state:not(.shared)").on("visiting", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateName = $thisState.attr("data-name");
		var thisStateRoot = thisStateID.split("___")[1];
		showDeep(thisStateID);
		$('body').attr('data-state-visiting-name', thisStateName);
		$('body').attr('data-state-visiting-id', thisStateID);
		$(".state:not('#" + thisStateID + "')").removeClass("visiting").attr("data-visiting", "false");
		$thisState.attr("data-visiting", "true").addClass("visiting");
		$(".icon." + thisStateRoot + ":not(.visited)").removeClass("hide").show();
		if ($thisState.hasClass("visited") === false) {
			$thisState.trigger("visited");
		}

		// console.log("$('#" + thisStateID + "');");
	});
	$(".state:not(.shared)").on("unvisit", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateRoot = thisStateID.split("___")[1];
		hideDeep(thisStateID);
		$thisState.attr("data-visiting", "false").removeClass("visiting");
		$(".icon." + thisStateRoot + ".visited").addClass("hide").hide();
	});
	$(".state:not(.shared)").on("gotostate", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		$(".state:not(.shared)").trigger('unvisit');
		$thisState.trigger('visiting');
		// var thisStateRoot = thisStateID.split("___")[1];
		// hideDeep(thisStateID);
		// $thisState.attr("data-visiting", "false").removeClass("visiting");
		// $(".icon." + thisStateRoot + ".visited").addClass("hide").hide();
	});
	$(".state").on("configure", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateRoot = thisStateID.split("___")[1];
		$thisState.attr("data-configuring", "true").addClass("configuring");
		$(".icon." + thisStateRoot + ".configured").removeClass("hide").show();
	});
	$(".state:not(.shared)").on("deconfigure", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateRoot = thisStateID.split("___")[1];
		$thisState.attr("data-configuring", "false").removeClass("configuring");
		$(".icon." + thisStateRoot + ".visited").addClass("hide").hide();
		$(".icon." + thisStateRoot + ".configured").addClass("hide").hide();
	});
	$(".state:not(.shared)").on("visited", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr("id");
		var thisStateRoot = thisStateID.split("___")[1];
		$thisState.attr("data-visited", "true").addClass("visited");
	});
	$(".highlight").remove();
	if ($("body").hasClass("dev") === true) {} else {
		if (typeof init == "function") {
			init();
		}
	}
	$(".option").on("chooseoption", function(event, thingy) {
		var $thisElement = $(this);
		$thisElement.siblings('.option').each(function() {
			hide($(this));
		});
		show($thisElement);
		// console.debug("event", event);
		// console.debug("thingy", thingy);
		var $buttonCallingThis = $(thingy.currentTarget);
		// console.debug("$(thingy.currentTarget)", $(thingy.currentTarget));
		var buttonCallingThisName = $buttonCallingThis.attr('data-button-name');
		// console.debug("buttonCallingThisName", buttonCallingThisName);
		// $thisElement.parents().find('.dropdown:not(.option,.options)').trigger('click');
		$thisElement.parents().find('.dropdown:not(.option,.options)').trigger('click').attr('data-option-shown', buttonCallingThisName);
	});
	$(".pane").on("showscope", function(event, thingy) {
		var $thisElement = $(this);
		$thisElement.siblings('.pane').each(function() {
			hide($(this));
		});
		show($thisElement);
		// console.debug("event", event);
		// console.debug("thingy", thingy);
		var $buttonCallingThis = $(thingy.currentTarget);
		// console.debug("$(thingy.currentTarget)", $(thingy.currentTarget));
		var buttonCallingThisName = $buttonCallingThis.attr('data-button-name');
		// console.debug("buttonCallingThisName", buttonCallingThisName);
		// $thisElement.parents().find('.dropdown:not(.pane,.panes)').trigger('click');
		$thisElement.parents().find('.dropdown:not(.pane,.panes)').trigger('click').attr('data-pane-shown', buttonCallingThisName);
	});


	$(".button[data-target-gotostate]").each(function() {
		var prevGotoStateValue = $(this).attr('data-target-gotostate');
		$(this).attr('data-target-gotostate', 'state.' + prevGotoStateValue);
	});

	$('.button').each(function() {
		var $thisElement = $(this);
		var thisElementID = $thisElement.attr('id');
		var thisButtonName = $thisElement.attr('data-button-name');


		var thisElementHoverIndicator = $('.' + thisButtonName + '.hoverIndicator').attr('id');
		var $thisElementHoverIndicators = $('.' + thisButtonName + '.hoverIndicator');
		var $thisElementSelectedIndicators = $('.' + thisButtonName + '.selectedIndicator');

		var thisButtonOnclickEventName = $thisElement.attr('data-event-onclick');
		var thisButtonOnclickEventTargetName = $thisElement.attr('data-target-' + thisButtonOnclickEventName);

		if (thisButtonOnclickEventTargetName === 'thisname') {
			var newButtonOnclickEventTargetName = thisButtonName;
			// console.debug("Giving the button thisButtonName a newButtonOnclickEventTargetName: " + newButtonOnclickEventTargetName);
			$thisElement.attr('data-target-' + thisButtonOnclickEventName, thisButtonName);
		}

		$thisElement.on('mouseover', function() {
			$thisElementHoverIndicators.each(function() {
				console.log("$(this).attr('id')", $(this).attr('id'));
				show($(this).attr('id'));
			});
			// console.debug("thisElementSelectedIndicator", thisElementSelectedIndicator);
		}).on('mouseout', function() {
			$thisElementHoverIndicators.each(function() {
				console.log("$(this).attr('id')", $(this).attr('id'));
				hide($(this).attr('id'));
			});
			hide(thisElementHoverIndicator);
		}).on('click', function() {
			$thisElementHoverIndicators.each(function() {
				console.log("$(this).attr('id')", $(this).attr('id'));
				show($(this).attr('id'));
			});
			$thisElementSelectedIndicators.each(function() {
				console.log("$(this).attr('id')", $(this).attr('id'));
				show($(this).attr('id'));
			});
			// debug.debug("thisElementSelectedIndicator", thisElementSelectedIndicator);
		});
	});

	$('.button[data-event-onclick]').on('click', function(event) {
		// console.debug("clicked!");
		var $thisElement = $(this);
		var thisButtonParentInstance = $thisElement.parents('.instance').attr('id');
		var thisButtonOnclickEventName = $thisElement.attr('data-event-onclick');
		var thisButtonDataClickInstance = $thisElement.attr('data-clickinstance');
		var thisButtonOnclickEventTargetName = $thisElement.attr('data-target-' + thisButtonOnclickEventName);
		// console.debug("thisButtonOnclickEventName", thisButtonOnclickEventName);
		// console.debug("thisButtonOnclickEventTargetName", thisButtonOnclickEventTargetName);


		if (typeof thisButtonDataClickInstance !== 'undefined') {
			thisButtonParentInstance = 'instance___' + thisButtonDataClickInstance;
		}
		if (typeof thisButtonParentInstance !== 'undefined') {
			console.debug("thisButtonParentInstance", thisButtonParentInstance);
			console.debug("$('." + thisButtonOnclickEventTargetName + "', '#" + thisButtonParentInstance + "')");
			$('.' + thisButtonOnclickEventTargetName, '#' + thisButtonParentInstance).trigger(thisButtonOnclickEventName, event);
		} else {
			$('.' + thisButtonOnclickEventTargetName).trigger(thisButtonOnclickEventName, event);
		}

	});

	$('.button[data-event-onclick2]').on('click', function(event) {
		// console.debug("clicked!");
		var $thisElement = $(this);
		var thisButtonParentInstance = $thisElement.parents('.instance').attr('id');
		var thisButtonOnclickEventName = $thisElement.attr('data-event-onclick2');
		var thisButtonOnclickEventTargetName = $thisElement.attr('data-target-' + thisButtonOnclickEventName);
		// console.debug("thisButtonOnclickEventName", thisButtonOnclickEventName);
		// console.debug("thisButtonOnclickEventTargetName", thisButtonOnclickEventTargetName);
		if (typeof thisButtonParentInstance !== 'undefined') {
			// console.debug("thisButtonParentInstance", thisButtonParentInstance);
			$('.' + thisButtonOnclickEventTargetName, '#' + thisButtonParentInstance).trigger(thisButtonOnclickEventName, event);
		} else {
			$('.' + thisButtonOnclickEventTargetName, '.instance').trigger(thisButtonOnclickEventName, event);
		}

	});

	// $("#state___1").trigger("visiting");
	// $("#state___initial").trigger("visiting");
	// $("#state___email_preview_1").trigger("visiting");


};


var hideOutlines = function hideOutlines() {
	$("body").removeClass("show-draggable-outlines");
};

var timeoutID = window.setTimeout(runIt, window.timeoutLength);

var timeoutIdHideOutlines = window.setTimeout(hideOutlines, 5e3);