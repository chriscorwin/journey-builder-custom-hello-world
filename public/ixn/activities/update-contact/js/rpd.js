var test = function test(e) {
	console.log('test', e);
}

debug.setLevel(5);


String.prototype.endsWith = function(value) {
	if (this.length < value.length) {
		return false;
	} else {
		return Boolean(this.substr((this.length - value.length), (value.length + 1)) === value);
	}
}

String.prototype.contains = function(value, caseFlag) {
	if (this.length < value.length) {
		return false;
	} else {
		var regExPattern_value = (caseFlag === false ? new RegExp(value, '\i') : new RegExp(value));
		return Boolean(this.match(regExPattern_value));
	}
}

function isArray(o) {
	return Object.prototype.toString.call(o) === '[object Array]';
}

String.prototype.beginsWith = function(string) {
	return (this.indexOf(string) === 0);
};

var hide = function hide(el) {
	$('body').hasClass('dev');
	if ($('body').hasClass('dev')) {
		return;
	}
	var theElement = el,
		theElementID = '',
		$theElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// debug.info('[hide] Argument passed in is an instance of jQuery!');
		theElementID = el.attr('id');
		$theElement = el;
		theElement = theElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			hide(value);
		});
		return;
	} else {
		// debug.info("[hide] Is not an array, is not a jQuery object....");
		// debug.info("[hide] el", el);
		if (typeof el === 'string' && el.beginsWith('#') === false && el.beginsWith('.') === false) {
			// debug.info("[hide] Does not begin with # nor .");
			theElementID = "#" + el;
			// debug.info("[hide] theElementID", theElementID);
			$theElement = $(theElementID);

		} else {
			$theElement = $(theElement)
			theElementID = $theElement.attr('id')
		}
	}
	$theElement.addClass('hide').hide();
};

var show = function show(el) {
	$('body').hasClass('dev');
	if ($('body').hasClass('dev')) {
		return;
	}
	var theElement = el,
		theElementID = '',
		$theElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// debug.info('[show] Argument passed in is an instance of jQuery!');
		theElementID = el.attr('id');
		$theElement = el;
		theElement = theElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			show(value);
		});
		return;
	} else {
		// debug.info("[show] Is not an array, is not a jQuery object....");
		// debug.info("[show] el", el);
		if (typeof el === 'string' && el.beginsWith('#') === false && el.beginsWith('.') === false) {
			// debug.info("[show] Does not begin with # nor .");
			theElementID = "#" + el;
			// debug.info("[show] theElementID", theElementID);
			$theElement = $(theElementID);

		} else {
			$theElement = $(theElement)
			theElementID = $theElement.attr('id')
		}
	}
	$theElement.removeClass('hide').show();
};



var toggle = function toggle(el) {
	$('body').hasClass('dev');
	if ($('body').hasClass('dev')) {
		return;
	}
	var theElement = el,
		theElementID = '',
		$theElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// debug.info('[toggle] Argument passed in is an instance of jQuery!');
		theElementID = el.attr('id');
		$theElement = el;
		theElement = theElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			toggle(value);
		});
		return;
	} else {
		// debug.info("[toggle] Is not an array, is not a jQuery object....");
		// debug.info("[toggle] el", el);
		if (typeof el === 'string' && el.beginsWith('#') === false && el.beginsWith('.') === false) {
			// debug.info("[toggle] Does not begin with # nor .");
			theElementID = "#" + el;
			// debug.info("[toggle] theElementID", theElementID);
			$theElement = $(theElementID);

		} else {
			$theElement = $(theElement)
			theElementID = $theElement.attr('id')
		}
	}
	if ($theElement.hasClass('hide')) {
		debug.info(theElementID + ' is currently hiding, will now show.')
		show(theElementID);
	} else {
		debug.info(theElementID + ' is currently visible, will now hide.')
		hide(theElementID);
	}
	// $theElement.removeClass('hide').toggle();
};



var showDeep = function showDeep(el) {
	$('body').hasClass('dev');
	if ($('body').hasClass('dev')) {
		return;
	}
	var theElement = el,
		theElementID = '',
		$theElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// debug.info('[showDeep] Argument passed in is an instance of jQuery!');
		theElementID = el.attr('id');
		$theElement = el;
		theElement = theElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			showDeep(value);
		});
		return;
	} else {
		// debug.info("[showDeep] Is not an array, is not a jQuery object....");
		// debug.info("[showDeep] el", el);
		if (typeof el === 'string' && el.beginsWith('#') === false && el.beginsWith('.') === false) {
			// debug.info("[showDeep] Does not begin with # nor .");
			theElementID = "#" + el;
			// debug.info("[showDeep] theElementID", theElementID);
			$theElement = $(theElementID);

		} else {
			$theElement = $(theElement)
			theElementID = $theElement.attr('id')
		}
	}
	// debug.info("[showDeep] theElementID", theElementID);
	$theElement.removeClass('hide');
	$theElement.show();

	$hiddenNodes = $theElement.find('.hide:not(.starts_hidden)');

	// debug.info("[showDeep] $hiddenNodes", $hiddenNodes);
	$hiddenNodes.each(function(i, node) {
		// debug.info("[showDeep] showDeep on node: ", $(node).attr('id'));
		showDeep($(node).attr('id'));
	});
	showPopupsInElement(theElementID);



};





var hideDeep = function hideDeep(el) {
	$('body').hasClass('dev');
	if ($('body').hasClass('dev')) {
		return;
	}
	var theElement = el,
		theElementID = '',
		$theElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// debug.info("[hideDeep] Argument passed in is an instance of jQuery!");
		theElementID = el.attr('id');
		$theElement = el;
		theElement = theElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			showDeep(value);
		});
		return;
	} else {
		debug.info("[hideDeep] Is not an array, is not a jQuery object....");
		debug.info("[hideDeep] el", el);
		if (typeof el === 'string' && el.beginsWith('#') === false && el.beginsWith('.') === false) {
			// debug.info("[hideDeep] Does not begin with # nor .");
			theElementID = "#" + el;
			// debug.info("[hideDeep] theElementID", theElementID);
			$theElement = $(theElementID);
		} else {
			$theElement = $(theElement)
			theElementID = $theElement.attr('id')
		}
	}
	$theElement.addClass('hide').hide();
	hidePopupsInElement(theElementID);
};








var showPopupsInElement = function showPopupsInElement(el) {
	$('body').hasClass('dev');
	if ($('body').hasClass('dev')) {
		return;
	}
	var theElement = el,
		theElementID = '',
		$theElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// debug.debug("showPopupsInElement Argument passed in is an instance of jQuery!");
		theElementID = el.attr('id');
		$theElement = el;
		theElement = theElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			showDeep(value);
		});
		return;
	} else {
		// debug.debug("showPopupsInElement Is not an array, is not a jQuery object....");
		// debug.debug("showPopupsInElement el", el);
		if (el.beginsWith('#') === false && el.beginsWith('.') === false) {
			// debug.debug("showPopupsInElement Does not begin with # nor .");
			theElementID = "#" + el;
			// debug.debug("showPopupsInElement theElementID", theElementID);
			$theElement = $(theElementID);
		} else {
			$theElement = $(theElement)
			theElementID = $theElement.attr('id')
		}
	}
	$theElement.find('.group.is_popup').removeClass('hide').show(0, function(event) {



		var $elementToScrollTo = $(this).find('div[id*="popup"]');
		var elementToScrollToID = $elementToScrollTo.attr('id');



		var rootElement = '.canvas-scroll-pane';
		if ($('title').text() === 'WebCode Document') {
			rootElement = 'body';
		}

		var newTop = ($elementToScrollTo.offset().top);
		var newLeft = ($elementToScrollTo.offset().left);
		var elementToScrollToWidth = $elementToScrollTo.width();

		debug.info("$elementToScrollTo.attr('id')", $elementToScrollTo.attr('id'));
		// debug.info("$elementToScrollTo.offset().top", $elementToScrollTo.offset().top);

		newLeft = (newLeft - 200);
		if (newLeft <= 0) {
			newLeft = 0;
		}
		debug.info("newLeft", newLeft);
		debug.info("newLeft / 160", newLeft / 160);
		var newLeftBy160 = Math.round(newLeft / 160);
		debug.info("newLeftBy160", newLeftBy160);


		// $(rootElement).scrollTo({
		//  top: ($elementToScrollTo.offset().top),
		//  left: $elementToScrollTo.offset().left + 300
		// }, 125);

		var offsetTop = (($(rootElement).height() / 4) * -1);
		var offsetLeft = (($(rootElement).width() / 4) * -1);

		if ($('title').text() === 'WebCode Document') {
			offsetTop = -200;
		}




		// debug.info("offsetTop", (offsetTop));
		// debug.info("offsetLeft", (offsetLeft));


		// $('.canvas-view-swim-lane-highlighted').css({
		// 	'transform': 'translateX(' + (160 * newLeftBy160) + 'px)',
		// 	'width': (159 * (newLeftBy160 + 1))
		// });
		$(rootElement).scrollTo('#' + elementToScrollToID, {
			duration: 500,
			offset: {
				top: (offsetTop),
				left: (((offsetLeft)) + (elementToScrollToWidth / 4))
			}
		});

		// $(rootElement).scrollTo({
		//  top: ($elementToScrollTo.offset().top - 200),
		//  left: $elementToScrollTo.offset().left - 300
		// }, 500);




		// debug.debug("$(this).find('div[id*=popup]').attr('id')", $(this).find('div[id*="popup"]').attr('id'));
		// var $elementToScrollTo = $(this).find('div[id*="popup"]');
		// var elementToScrollToID = $elementToScrollTo.attr('id');


		// debug.debug("$elementToScrollTo.attr('id')", $elementToScrollTo.attr('id'));
		// debug.debug("$elementToScrollTo.offset().top", $elementToScrollTo.offset().top);
		// debug.debug("$elementToScrollTo.offset().left", $elementToScrollTo.offset().left);

		// var $rootElement = '#scroll-pane-content';
		// if ($('title').text() === 'WebCode Document') {
		//  $rootElement = 'body';
		// }

		// $rootElement.scrollTo($elementToScrollTo);

	});
};







var hidePopupsInElement = function hidePopupsInElement(el) {
	$('body').hasClass('dev');
	if ($('body').hasClass('dev')) {
		return;
	}
	var theElement = el,
		theElementID = '',
		$theElement, $hiddenNodes;
	if (el instanceof jQuery === true) {
		// debug.debug("[hidePopupsInElement] Argument passed in is an instance of jQuery!"");
		theElementID = el.attr('id');
		$theElement = el;
		theElement = theElementID;
	} else if (isArray(el)) {
		$.each(el, function(index, value) {
			showDeep(value);
		});
		return;
	} else {
		// debug.debug("[hidePopupsInElement] Is not an array, is not a jQuery object....");
		// debug.debug("[hidePopupsInElement] el", el);
		if (el.beginsWith('#') === false && el.beginsWith('.') === false) {
			// debug.debug("[hidePopupsInElement] Does not begin with # nor .");
			theElementID = "#" + el;
			// debug.debug("[hidePopupsInElement] theElementID", theElementID);
			$theElement = $(theElementID);
		} else {
			$theElement = $(theElement)
			theElementID = $theElement.attr('id')
		}
	}
	$theElement.find('.group.is_popup').addClass('hide').hide();
};









var copyToClipboard = copyToClipboard || function copyToClipboard() {
		window.prompt("Copy and paste this into console to get source:", "copy(rpdNodes);");
	}


var printHTML = printHTML || function printHTML() {
		window.rpdNodes = $('body').html();
		// debug.group('Source:');
		// debug.debug(window.rpdNodes);
		// debug.groupEnd();
		copyToClipboard();
	}


var makeAttributesFromID = function makeAttributesFromID(selectorPattern) {
	var rootElement = '#root';
	if ($('title').text() === 'WebCode Document') {
		rootElement = 'body';
	}
	debug.log("selectorPattern", selectorPattern);

	$(selectorPattern, rootElement).each(function(i, e) {
		$e = $(e);
		// var thisID = $(this).attr('id');
		// var nextID = thisID.split('_goto_')[1];
		// var prevID = $(this).attr('data-target-prev');
		// $(this).attr('onclick', 'showDeep(\'#' + nextID + '\'); hideDeep(\'#' + thisID + '\')');

		var thisID = $e.attr('id');
		if (typeof thisID === 'undefined') {
			debug.warn("[makeAttributesFromID] thisID", thisID);
			debug.warn("[makeAttributesFromID] typeof thisID", typeof thisID);
			return true;
		}
		var thisIdSplit1 = thisID.split('___');
		if (thisIdSplit1.join(' ').contains('split_d')) {
			// debug.debug("thisIdSplit1", thisIdSplit1);
		}
		// $e.attr('class', thisIdSplit1.join(' '));
		$.each(thisIdSplit1, function(index, value) {
			$e.addClass(value);
			if (value.beginsWith('gotostate')) {
				var stateToGoTo = value.split('_');
				stateToGoTo.shift();
				stateToGoTo = "state___" + stateToGoTo.join('_');
				// debug.debug('stateToGoTo', stateToGoTo);
				$e.addClass('gotostate');
				$e.attr('data-target-next', stateToGoTo);
			}
			if (value.beginsWith('chooseoption')) {
				var optionToChoose = value.split('_');
				optionToChoose.shift();
				var dropDownRoot = $e.parents('.dropdown.options').attr('id').split('dropdown___options___').shift().join('');
				optionToChoose = "dropdown___option___ROOT-GOES-HERE___" + optionToChoose.join('_');
				debug.debug('optionToChoose', optionToChoose);
				debug.debug('dropDownRoot', dropDownRoot);
				$e.addClass('chooseoption');
				$e.attr('data-target-option', optionToChoose);
			}
		});
	});

}

var passChildrenAttributesFromID = function passChildrenAttributesFromID(selectorPattern) {
	var rootElement = '#root';
	if ($('title').text() === 'WebCode Document') {
		rootElement = 'body';
	}
	debug.log("selectorPattern", selectorPattern);

	$(selectorPattern, rootElement).each(function(i, e) {
		$e = $(e);
		// var thisID = $(this).attr('id');
		// var nextID = thisID.split('_goto_')[1];
		// var prevID = $(this).attr('data-target-prev');
		// $(this).attr('onclick', 'showDeep(\'#' + nextID + '\'); hideDeep(\'#' + thisID + '\')');

		var thisID = $e.attr('id');
		if (typeof thisID === 'undefined') {
			debug.warn("[passChildrenAttributesFromID] thisID", thisID);
			debug.warn("[passChildrenAttributesFromID] typeof thisID", typeof thisID);
			return true;
		}
		var thisIdSplit1 = thisID.split('___');
		var newClassNames = thisIdSplit1.join(' ');
		debug.warn("[passChildrenAttributesFromID] newClassNames", newClassNames);
		console.log("$e.children()", $e.children());
		// $e.children().attr('class', newClassNames);

		$.each(thisIdSplit1, function(index, value) {
			if (value.beginsWith('ancestor')) {

			} else {
				$e.children().addClass(value);
				if (value.beginsWith('dropson_')) {
					var elementToDropOn = value.split('_');
					elementToDropOn.shift();
					elementToDropOn = elementToDropOn.join('_');
					console.log("elementToDropOn", elementToDropOn);
					$e.children().addClass('drops-on-' + elementToDropOn).addClass('draggable').addClass('dropson');
					// $e.children().addClass('');
					$('#' + elementToDropOn).attr('data-droppable', 'true').attr('data-drop-accepts', '.drops-on-' + elementToDropOn);
					$('#' + elementToDropOn).addClass('droppable').addClass('ui-droppable');
					// $('#' + elementToDropOn).attr('data-drop-handler-target', ('#' + buttonName + '___whendropped'));
					$e.children().attr('data-target-drop', '#' + elementToDropOn);
				} else
				if (value.beginsWith('gotostate')) {
					var stateToGoTo = value.split('_');
					stateToGoTo.shift();
					stateToGoTo = "state___" + stateToGoTo.join('_');
					$e.children().addClass('gotostate');
					$e.children().attr('data-target-next', stateToGoTo);
				} else
				if (value.beginsWith('chooseoption')) {
					var optionToChoose = value.split('_');
					optionToChoose.shift();
					var dropDownRoot = $e.parents('.dropdown.options').attr('id').split('dropdown___options___').shift().join('');
					optionToChoose = "dropdown___option___ROOT-GOES-HERE___" + optionToChoose.join('_');
					debug.debug('optionToChoose', optionToChoose);
					debug.debug('dropDownRoot', dropDownRoot);
					$e.children().addClass('chooseoption');
					$e.children().attr('data-target-option', optionToChoose);
				} else {
					$e.children().addClass(value);

				}
			}
		});

	});

}


var runIt = function runIt() {
	var rootElement = '#root';
	if ($('title').text() === 'WebCode Document') {
		rootElement = 'body';
	}
	passChildrenAttributesFromID("div[id^='ancestor___']");
	makeAttributesFromID("div");
	$("div[id^='ancestor___']").attr('class', '');

	$('.starts_hidden').addClass('hide');
	$("div[id^='state___']:not(.initial").addClass('group').addClass('hide');
	// state___isconfigured___autoproceed___gotostate_email_preview_1


	/*
$("div[id^='state_shared__']").addClass('state-shared');
$("div[id^='group__']").addClass('group');
// $("div[id$='group']").addClass('group');
// $("div[id^='popup']").addClass('popup');

// group__ispopup__startshidden__hasmobileyes__splitawait

$("div[id$='popup']").addClass('popup');
*/
	$("div[id^='button']").addClass('button').addClass('clickable');
	$("div.dropdown.options").addClass('starts_hidden');
	// $(".button.gotostate").attr('data-override-target', 'this-id').addClass('override-target');
	$(".button.gotostate").addClass('override-target');
	$("div.button").addClass('btn');
	// $("div:not(.group)").addClass('img');
	/*
$("div[id*='next_button']").addClass('next_button').addClass('button');
$("div[id*='back_button']").addClass('back_button').addClass('button');
$("div[id*='configured']").addClass('configured');
$("div[id*='visited']").addClass('visited');
$("div[id*='gotostate']").attr('data-override-target', 'this-id').addClass('override-target');

$("div.group[id*='activity_bar']").addClass('state').addClass('state-shared').addClass('activity_bar');
*/
	// $("div.img.popup").addClass('hide').css('z-index', '3');
	// $("div.img.button").css('z-index', '4');
	// $("div.img.button").css('z-index', '4');
	/*
$("div.img.configured, div.img.visited").addClass('hide').css('z-index', '2');


// hide stuff
$("div.group.popup").addClass('hide');
$("div.configured:not(.do-not-hide)").addClass('hide');
$("div.visited:not(.do-not-hide)").addClass('hide');
*/
	/*
$('.state:visible', 'body').addClass('state-shared state-initial');
*/
	$("div.button").each(function(index) {
		var $element = $(this);
		var elementID = $element.attr('id');
		var buttonName = $element.attr('id').split('___')[0];
		if (elementID.beginsWith('button___')) {
			buttonName = $element.attr('id').split('___')[1];
		}
		$element.attr('data-name', buttonName);
	});

	$("div.dropson").each(function(index) {

		// this class
		// button dropson_attrbucket drops-on-attrbucket draggable dropson life btn ui-draggable

		// sibling to show
		// life whendropped starts_hidden hide

		var $element = $(this);
		$('body').addClass('show-draggable-outlines');
		var elementID = $element.attr('id');
		var buttonName = $element.attr('id').split('___')[0];
		var siblingToShowClassNames = '.' + buttonName + '.whendropped_show';
		// if ($(siblingToShowClassNames).length > 0) {
		// 	$element.attr('data-toggle-show', siblingToShowClassNames);
		// }
		var siblingToHideClassNames = '.' + buttonName + '.whendropped_hide';
		// if ($(siblingToHideClassNames).length > 0) {
		// $element.attr('data-toggle-hide',  siblingToHideClassNames);
		// }
		$element.on('dropped', function() {
			console.log(buttonName + " was dropped!");

			if (($(siblingToHideClassNames).length === 0) === false) {
				hideDeep(siblingToHideClassNames);
			}
			if (($(siblingToShowClassNames).length === 0) === false) {
				showDeep(siblingToShowClassNames);
			}
		});
		// if (elementID.beginsWith('button___')) {
		// 	buttonName = $element.attr('id').split('___')[1];
		// }
		// $element.attr('data-name', buttonName);
	});
	$("div.droppable").each(function(index) {

		// this class
		// button dropson_attrbucket drops-on-attrbucket draggable dropson life btn ui-draggable

		// sibling to show
		// life whendropped starts_hidden hide

		var $element = $(this);
		var elementID = $element.attr('id');
		var elementName = $element.attr('id').split('___')[0];
		var siblingToShowClassNames = '.' + elementName + '.whendropped_show';
		// if ($(siblingToShowClassNames).length > 0) {
		// 	$element.attr('data-toggle-show', siblingToShowClassNames);
		// }
		var siblingToHideClassNames = '.' + elementName + '.whendropped_hide';
		// if ($(siblingToHideClassNames).length > 0) {
		// $element.attr('data-toggle-hide',  siblingToHideClassNames);
		// }
		$element.on('droppedonto', function() {
			console.log(elementName + " was droppedonto!");

			if (($(siblingToHideClassNames).length === 0) === false) {
				hideDeep(siblingToHideClassNames);
			}
			if (($(siblingToShowClassNames).length === 0) === false) {
				showDeep(siblingToShowClassNames);
			}
		});
		// if (elementID.beginsWith('button___')) {
		// 	elementName = $element.attr('id').split('___')[1];
		// }
		// $element.attr('data-name', elementName);
	});
	$("div[id^='state___'].state").each(function(index) {
		var $thisState = $(this);
		var $nextState = $(this).next();
		var $prevState = $(this).prev();
		var thisStateID = $thisState.attr('id');
		var nextStateID = $nextState.attr('id');
		var prevStateID = $prevState.attr('id');

		var onclickActionsNext = "$('#" + thisStateID + "').trigger('unvisit'); $('#" + nextStateID + "').trigger('visiting'); ";
		var onclickActionsBack = "$('#" + prevStateID + "').trigger('visiting'); $('#" + thisStateID + "').trigger('unvisit'); ";

		$(this)
			.attr('data-toggle', 'state')
			.attr('data-target-next', nextStateID)
			.attr('data-target-prev', prevStateID)
			.find(".dropdown:not(.options, .option)").on('click', function(event) {
				debug.group("[Dropdown click]");
				var $childDropdown = $(this).next();
				event.stopPropagation();
				toggle($childDropdown);
				// $('body').on('click', function(event) {
				// 	// hide($childDropdown);
				// 	debug.info('body click!');
				// });
				debug.groupEnd();
			}).end()
		// .find(".dropdown.options").on('mouseover', function(event) {
		// 	debug.group("[Dropdown options mouseover]");
		// 	// hide($(this).next());
		// 	debug.groupEnd();
		// }).end()
		.find(".dropdown.options").find('.dropdown.option').on('mouseout', function(event) {
			debug.group("[Dropdown options > option mouseout]");
			// hide($(this).parents('.dropdown.options'));
			debug.log($(this).parents('.dropdown.options').attr('id'));
			debug.groupEnd();
		}).end().end()
			.find("div[id^='button'].button.next, div[id$='next_button']").on('click', function() {
				debug.group("[Default Next]");
				debug.warn("[Default Next] thisStateID", thisStateID);
				debug.warn("[Default Next] nextStateID", nextStateID);
				debug.warn("[Default Next] prevStateID", prevStateID);
				debug.groupEnd();
			}).attr('data-target-next', nextStateID).attr('data-target-prev', prevStateID).attr('onclick', onclickActionsNext).end()
			.find("div[id^='button'].button.back, div[id$='back_button']").on('click', function() {
				debug.group("[Default Back]");
				debug.warn("[Default Back] thisStateID", thisStateID);
				debug.warn("[Default Back] nextStateID", nextStateID);
				debug.warn("[Default Back] prevStateID", prevStateID);
				debug.groupEnd();
			}).attr('data-target-next', prevStateID).attr('data-target-prev', nextStateID).attr('onclick', onclickActionsBack).end()
		// .find("div[id^='button'].button.custom").attr('data-target-next', $nextState.attr('id'))..attr('onclick', onclickActionsNext).end()
		// end of stuffs
		;
	});

	$('.override-target').each(function(index) {
		var $thisElement = $(this);
		var thisID = $thisElement.attr('id');
		var thisParentStateID = $thisElement.parents("[id^='state___'].state").attr('id');
		var stateToGoTo;
		var theseClassNames = $thisElement.attr('class').split(' ');
		$.each(theseClassNames, function(index, value) {
			if (value.beginsWith('gotostate_')) {
				var stateToGoTo = 'state___' + value.split('gotostate_')[1];
				$thisElement.attr('data-target-next', stateToGoTo);
			}
		});
		// var nextID = thisID.split('_goto_')[1];
		var nextState = $thisElement.attr('data-target-next');
		// var prevState = $thisElement.attr('data-target-prev');
		// debug.debug("prevState", prevState);

		// next actions

		// $('#state___wait_email_preview_1').trigger('unvisit');
		// $('#state___wait_email_preview_1').trigger('visited');
		// $('state___split_has_mobile_choose').trigger('visiting');
		// showDeep('#state___split_has_mobile_choose');
		// hideDeep('#state___wait_email_preview_1');


		// if (typeof prevState === 'undefined' || prevState === '') {
		// }
		var prevState = $thisElement.parents(".state").attr("data-target-prev");
		$thisElement.attr('data-target-prev', prevState);
		// $thisElement.attr('onclick', 'showDeep(\'#' + nextState + '\'); hideDeep(\'#' + prevState + '\')');
		// $thisElement.attr('onclick', 'showDeep(\'#' + nextState + '\'); hideDeep(\'#' + prevState + '\');');
		// $thisElement.on('click', function() {
		//     showDeep('#' + nextState);
		//     hideDeep('#' + prevState);
		// });
		// var onclickActionsShared = "debug.warn('Button Clicked!'); ";
		// var onclickActionsShared = "function(){debug.warn('prevState', prevState); }(); ";
		// var onclickActionsShared = "function(){debug.warn('nextState', nextState); }(); ";
		// var onclickActionsNext = "debug.warn('Next!'); ";
		// var onclickActionsBack = "debug.warn('Back!'); ";
		// var onclickActionsOther = "debug.warn('Other!'); ";
		// var onclickActions = " ";

		if ($thisElement.hasClass('back')) {
			$thisElement.on('click', function() {
				debug.group("[Overriden Back]");
				debug.warn("[Overriden Back] thisParentStateID", thisParentStateID);
				debug.warn("[Overriden Back] nextState", nextState);
				debug.warn("[Overriden Back] prevState", prevState);
				debug.groupEnd();
				$('#' + thisParentStateID).trigger('unvisit');
				$('#' + thisParentStateID).trigger('deconfigure');
				$('#' + nextState).trigger('visiting');
			});
			// onclickActionsBack += "";
			// onclickActionsBack += "";
			// onclickActionsBack += "";
			// onclickActions += onclickActionsShared + onclickActionsBack;
		} else if ($thisElement.hasClass('next')) {
			$thisElement.on('click', function() {
				debug.group("[Overriden Next]");
				debug.warn("[Overridden Next] thisParentStateID", thisParentStateID);
				debug.warn("[Overridden Next] nextState", nextState);
				debug.warn("[Overridden Next] prevState", prevState);
				$('#' + thisParentStateID).trigger('unvisit');
				debug.groupEnd();
				$('#' + nextState).trigger('visiting');
			});
			// onclickActionsNext += "$('#" + thisParentStateID + "').trigger('visited');";
			// onclickActionsNext += "$('#" + nextState + "').trigger('visiting');";
			// onclickActions += onclickActionsShared + onclickActionsNext;
		} else {
			$thisElement.on('click', function() {
				debug.group("[Overriden Other]");
				debug.warn("[Overridden Other] thisParentStateID", thisParentStateID);
				debug.warn("[Overridden Other] nextState", nextState);
				debug.warn("[Overridden Other] prevState", prevState);
				debug.groupEnd();
				$('#' + thisParentStateID).trigger('unvisit');
				$('#' + nextState).trigger('visiting');
			});
			// onclickActionsOther += "$('#" + thisParentStateID + "').trigger('unvisit');";
			// onclickActionsOther += "$('#" + nextState + "').trigger('visiting');";
			// onclickActions += onclickActionsShared + onclickActionsOther;
		}
		$thisElement.attr('onclick', 'debug.warn("Click overridden.");');
	});


	$('.button.custom.choose').each(function(index) {
		var $thisElement = $(this);
		var thisID = $thisElement.attr('id');
		var thisParentStateID = $thisElement.parents("[id^='state___'].state").attr('id');
		var stateToGoTo;
		var theseClassNames = $thisElement.attr('class').split(' ');
		$.each(theseClassNames, function(index, value) {
			if (value.beginsWith('gotostate_')) {
				var stateToGoTo = 'state___' + value.split('gotostate_')[1];
				$thisElement.attr('data-target-next', stateToGoTo);
			}
		});
		// var nextID = thisID.split('_goto_')[1];
		var nextState = $thisElement.attr('data-target-next');
		// var prevState = $thisElement.attr('data-target-prev');
		// debug.debug("prevState", prevState);

		// next actions

		// $('#state___wait_email_preview_1').trigger('unvisit');
		// $('#state___wait_email_preview_1').trigger('visited');
		// $('state___split_has_mobile_choose').trigger('visiting');
		// showDeep('#state___split_has_mobile_choose');
		// hideDeep('#state___wait_email_preview_1');


		// if (typeof prevState === 'undefined' || prevState === '') {
		// }
		var prevState = $thisElement.parents(".state").attr("data-target-prev");
		$thisElement.attr('data-target-prev', prevState);
		// $thisElement.attr('onclick', 'showDeep(\'#' + nextState + '\'); hideDeep(\'#' + prevState + '\')');
		// $thisElement.attr('onclick', 'showDeep(\'#' + nextState + '\'); hideDeep(\'#' + prevState + '\');');
		// $thisElement.on('click', function() {
		//     showDeep('#' + nextState);
		//     hideDeep('#' + prevState);
		// });
		// var onclickActionsShared = "debug.warn('Button Clicked!'); ";
		// var onclickActionsShared = "function(){debug.warn('prevState', prevState); }(); ";
		// var onclickActionsShared = "function(){debug.warn('nextState', nextState); }(); ";
		// var onclickActionsNext = "debug.warn('Next!'); ";
		// var onclickActionsBack = "debug.warn('Back!'); ";
		// var onclickActionsOther = "debug.warn('Other!'); ";
		// var onclickActions = " ";

		if ($thisElement.hasClass('back')) {
			$thisElement.on('click', function() {
				debug.group("[Overriden Back]");
				debug.warn("[Overriden Back] thisParentStateID", thisParentStateID);
				debug.warn("[Overriden Back] nextState", nextState);
				debug.warn("[Overriden Back] prevState", prevState);
				debug.groupEnd();
				$('#' + thisParentStateID).trigger('unvisit');
				$('#' + thisParentStateID).trigger('deconfigure');
				$('#' + nextState).trigger('visiting');
			});
			// onclickActionsBack += "";
			// onclickActionsBack += "";
			// onclickActionsBack += "";
			// onclickActions += onclickActionsShared + onclickActionsBack;
		} else if ($thisElement.hasClass('next')) {
			$thisElement.on('click', function() {
				debug.group("[Overriden Next]");
				debug.warn("[Overridden Next] thisParentStateID", thisParentStateID);
				debug.warn("[Overridden Next] nextState", nextState);
				debug.warn("[Overridden Next] prevState", prevState);
				$('#' + thisParentStateID).trigger('unvisit');
				debug.groupEnd();
				$('#' + nextState).trigger('visiting');
			});
			// onclickActionsNext += "$('#" + thisParentStateID + "').trigger('visited');";
			// onclickActionsNext += "$('#" + nextState + "').trigger('visiting');";
			// onclickActions += onclickActionsShared + onclickActionsNext;
		} else {
			$thisElement.on('click', function() {
				debug.group("[Overriden Other]");
				debug.warn("[Overridden Other] thisParentStateID", thisParentStateID);
				debug.warn("[Overridden Other] nextState", nextState);
				debug.warn("[Overridden Other] prevState", prevState);
				debug.groupEnd();
				$('#' + thisParentStateID).trigger('unvisit');
				$('#' + nextState).trigger('visiting');
			});
			// onclickActionsOther += "$('#" + thisParentStateID + "').trigger('unvisit');";
			// onclickActionsOther += "$('#" + nextState + "').trigger('visiting');";
			// onclickActions += onclickActionsShared + onclickActionsOther;
		}
		$thisElement.attr('onclick', 'debug.warn("Click overridden.");');
	});


	// $(".autoproceed").each(function(index, element) {
	// 	var stateToGoTo;
	// 	var theseClassNames = $(element).attr('id').split('___');
	// 	$.each(theseClassNames, function(index, value) {
	// 		if (value.beginsWith('gotostate')) {
	// 			var stateToGoTo = 'state___' + value.split('gotostate_')[1];
	// 			$(element).attr('data-target-next', '#' + stateToGoTo)
	// 		}
	// 	});

	// });

	// state___icons___configured___shared___starts_hidden___ungroup_after_init___children_start_hidden
	$(".state").each(function(index, element) {
		$(element).find('.button').first().addClass('default').addClass('first');
		$(element).find('.button').last().addClass('last');
	});
	$(".children_start_hidden").each(function(index, element) {
		$(element).children().addClass('starts_hidden');
	});
	$(".children_whendropped_show").each(function(index, element) {
		$(element).children().addClass('whendropped_show');
	});
	$(".ungroup_after_init").each(function(index, element) {
		$(element).children().each(function(index2, element2) {
			$(element2).insertAfter('#state___initial');
		});
	});


	$('.starts_hidden').addClass('hide');
	$('.hide').hide();

	$(".state").on("visiting", function(event) {

		var $thisState = $(this);
		var thisStateID = $thisState.attr('id');
		var thisStateRoot = thisStateID.split('___')[1];
		showDeep(thisStateID);
		debug.warn("[visit] thisStateID", thisStateID);


		$(".state:not('#" + thisStateID + "')").removeClass('visiting').attr('data-visiting', 'false');
		$thisState.attr('data-visiting', 'true').addClass('visiting');

		$(".icon." + thisStateRoot + ":not(.visited)").removeClass('hide').show();
		if ($thisState.hasClass('visited') === false) {
			$thisState.trigger('visited');
		}

	});

	$(".state").on("unvisit", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr('id');
		var thisStateRoot = thisStateID.split('___')[1];
		debug.warn("[unvisit]  thisStateID", thisStateID);
		hideDeep(thisStateID);
		$thisState.attr('data-visiting', 'false').removeClass('visiting');
		$(".icon." + thisStateRoot + ".visited").addClass('hide').hide();
	});


	$(".state").on("configure", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr('id');
		var thisStateRoot = thisStateID.split('___')[1];
		debug.warn("[configure]  thisStateID", thisStateID);
		$thisState.attr('data-configuring', 'true').addClass('configuring');
		$(".icon." + thisStateRoot + ".configured").removeClass('hide').show();
	});
	$(".state").on("deconfigure", function(event) {
		var $thisState = $(this);
		var thisStateID = $thisState.attr('id');
		var thisStateRoot = thisStateID.split('___')[1];
		debug.warn("[deconfigure]  thisStateID", thisStateID);
		$thisState.attr('data-configuring', 'false').removeClass('configuring');
		$(".icon." + thisStateRoot + ".visited").addClass('hide').hide();
		$(".icon." + thisStateRoot + ".configured").addClass('hide').hide();
	});


	$(".state").on("visited", function(event) {

		var $thisState = $(this);
		var thisStateID = $thisState.attr('id');
		var thisStateRoot = thisStateID.split('___')[1];
		debug.warn("[visited] thisStateID", thisStateID);


		$thisState.attr('data-visited', 'true').addClass('visited');


	});





	// showDeep('#state_email_preview_popup');


	// showDeep("#state___email_preview_1");
	$('.highlight').remove();
	$("#state___1").trigger("visiting");
	$("#state___email_preview_1").trigger("visiting");

	// printHTML();
	if ($('body').hasClass('dev') === true) {} else {
		if (typeof init == 'function') {
			init();
		}
	}
};


var hideOutlines = function hideOutlines() {
	$('body').removeClass('show-draggable-outlines');
}

var timeoutID = window.setTimeout(runIt, window.timeoutLength);
var timeoutIdHideOutlines = window.setTimeout(hideOutlines, 5000);