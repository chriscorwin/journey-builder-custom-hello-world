debug.setLevel(5);

var editGroupTemplateSource = $('#edit-group-template').html();
var editGroupTemplate;
if (typeof editGroupTemplateSource !== 'undefined') {
	editGroupTemplate = Handlebars.compile(editGroupTemplateSource);
}

var groupTemplateSource = $("#group-template").html();
var groupTemplate;
if (typeof groupTemplateSource !== 'undefined') {
	groupTemplate = Handlebars.compile(groupTemplateSource);
}

var editBarTemplateSource = $('#edit-bar-template').html();
var editBarTemplate;
if (typeof editBarTemplateSource !== 'undefined') {
	editBarTemplate = Handlebars.compile(editBarTemplateSource);
}

var editImageTemplateSource = $('#edit-image-template').html();
var editImageTemplate;
if (typeof editImageTemplateSource !== 'undefined') {
	editImageTemplate = Handlebars.compile(editImageTemplateSource);
}

var imageTemplateSource = $('#image-template').html();
var imageTemplate;
if (typeof imageTemplateSource !== 'undefined') {
	imageTemplate = Handlebars.compile(imageTemplateSource);
}

Handlebars.registerPartial("fileInputPartial", $("#file-input-partial").html());
Handlebars.registerPartial("disabledInputPartial", $("#disabled-input-partial").html());
Handlebars.registerPartial("checkboxPartial", $("#checkbox-partial").html());
Handlebars.registerPartial("dropdownInputPartial", $('#dropdown-input-partial').html());

Handlebars.registerHelper('fileInput', function(conditional, options) {
	if (!conditional) {
		return options.fn(options.hash.name);
	} else {
		var obj = {
			name: options.hash.name,
			value: conditional
		};
		return options.inverse(obj);
	}
});

Handlebars.registerHelper('setContext', function(options) {
	return options.fn(options.hash);
});

//keep track of auto id
var nextAutoIdNum = 0;
var currSelection = {};
var deletedElm = {};
var deletedElmStyle = {};
var draggableOptions = {
	// opacity: 0.7,
	// helper: "clone",
	start: function(event, ui) {
		//make a drag also trigger nudge on element???
		$('.nudge-box').trigger('mousedown');
	}
}



var getFileProperties = function getFileProperties(form, fileFieldClass) {
	//make sure exists
	if (!form || typeof form === "undefined") {
		return false;
	}
	if (!fileFieldClass || typeof fileFieldClass === "undefined") {
		return false;
	}
	if (form.getElementsByClassName(fileFieldClass) && form.getElementsByClassName(fileFieldClass)[0] && form.getElementsByClassName(fileFieldClass)[0].files[0]) {} else {
		if ( !! currSelection[fileFieldClass]) {
			return {
				name: currSelection[fileFieldClass]
			};
		} else {
			return false;
		}
	}

	var file = form.getElementsByClassName(fileFieldClass)[0].files[0];
	file.ext = file.name.match(/.png|.jpg|.gif|.jpeg/)[1];
	file.rawName = file.name.match(/([a-zA-Z0-9\_\-\ ]*).png|.jpg|.gif|.jpeg/)[1];

	return file;
};

var getFormObj = function getFormObj(form) {
	var formObj = {};
	var inputs = $(form).serializeArray();
	$.each(inputs, function(i, input) {
		formObj[input.name] = input.value;

		//ridiculous stupid way to make checkbox store as boolean
		if (input.name.match(/^is/) && input.value === "true") {
			formObj[input.name] = true;
		}
	});
	console.log('formObj', formObj)
	return formObj;
}

var getFormProperties = function getFormProperties(form) {
	var hiddenClass, retinaClass, draggableClass, resizableClass, selectableClass, hoverableClass, clickableClass, droppableClass;
	var exports = getFormObj(form.getElementsByTagName('form')[0]);

	//populate file input props, plus +Name props
	_.each(['elmImgFile', 'hoverFile', 'dropHoverFile', 'dropActiveFile', 'droppedFile', 'dragCloneFile'], function(i) {
		//see if file input box present on form
		if (document.getElementsByClassName(i).length) {
			exports[i] = getFileProperties(form, i);
			exports[i + 'Name'] = exports[i].name;
		} else { //otherwise grab value from disabled input
			exports[i + 'Name'] = document.getElementsByClassName(i + 'NameTxt')[0].value;
		}
	});

	exports.hoverable = !! exports.hoverFileName;
	hoverableClass = (exports.hoverable) ? ' hoverable' : '';

	if (form.getElementsByClassName('elmID')[0].value !== 'undefined' && form.getElementsByClassName('elmID')[0].value !== '') {
		exports.id = form.getElementsByClassName('elmID')[0].value;
	} else {
		// no id supplied, we'll just use the next one.
		while (document.contains(document.getElementById('elm' + nextAutoIdNum))) {
			nextAutoIdNum++
		}
		exports.id = 'elm' + nextAutoIdNum
	}


	hiddenClass = (exports.isHidable) ? ' hide' : '';
	retinaClass = (exports.isRetina) ? ' retina' : '';
	draggableClass = (exports.isDraggable) ? ' draggable' : ' notdraggable draggable';
	resizableClass = (exports.isResizable) ? ' resizable' : ' notresizable resizable';

	// var selectable =  form.getElementsByClassName('isSelectable')[0].checked;
	// var selectableClass = (selectable) ? ' selectable': '';

	exports.clickHandlerType = form.getElementsByClassName('clickHandlerType')[0].value;
	exports.clickable = !! exports.clickHandlerType;
	clickableClass = (exports.clickable) ? ' clickable' : '';
	//make this accept an array
	exports.clickHandler = exports.clickHandlerType + "('" + exports.clickHandlerTarget + "');";
	if (exports.clickHandlerType === "swapWith") {
		exports.clickHandler = 'swapWith("#' + exports.id + '", "' + exports.clickHandlerTarget + '");'
	}

	exports.dropHandlerType = form.getElementsByClassName('dropHandlerType')[0].value;
	if ( !! exports.dropHandlerType) {
		exports.dropHandler = exports.dropHandlerType + "('" + exports.dropHandlerTarget + "');";
	}
	droppableClass = ( !! exports.isDroppable) ? ' droppable' : '';

	exports.originalClasses = form.getElementsByClassName('classes')[0].value;
	exports.classes = exports.originalClasses + hiddenClass + retinaClass + draggableClass + resizableClass
	// + selectableClass
	+ hoverableClass + clickableClass + droppableClass;


	debug.log('formProperties', exports);

	return exports;
}

var editImageCallback = function editImageCallback(e) {
	var editImageForm = document.getElementById('editImage');

	if (currSelection.context == "Add") {
		//make sure they actually chose an image
		if (!getFileProperties(editImageForm, 'elmImgFile')) {
			return false;
		}
	}

	context = getFormProperties(editImageForm);
	context.parentID = $(this).data('value') || currSelection.parentID;

	var element = imageTemplate(context);

	addItem('#' + context.parentID, element, context);

	$("<img/>") // This is a lie -> Make in memory copy of image to avoid css issues
	.attr("src", 'images/' + context.elmImgFileName)
		.load(function() {
			// $('#' + context.id).css('width', this.width/2);
			if (context.retina) {
				$('#' + context.id).css({
					'width': this.width / 2 + 'px',
					'height': this.height / 2
				});
				if (context.draggable) {
					$('#' + context.id + ' img').css({
						'width': this.width / 2 + 'px',
						'height': this.height / 2
					});
				}
			} else {
				//I don't think this is actually needed...
				$('#' + context.id).css({
					'width': this.width + 'px',
					'height': this.height
				});
			}
		});

	$('#editImage').modal('hide');
	$('style', '#root').appendTo('head');


	return true;
}

var editGroupCallback = function editGroupCallback(e) {
	var groupForm = document.getElementById('editGroup');
	// if(!groupForm.getElementsByClassName('elmID').value){return;}

	var hidden = groupForm.getElementsByClassName('isHidable')[0].checked;
	var hiddenClass = (hidden) ? ' hide' : '';

	var classes = groupForm.getElementsByClassName('classes')[0].value + hiddenClass;
	var newElementID;

	if (groupForm.getElementsByClassName('elmID')[0].value !== 'undefined' && groupForm.getElementsByClassName('elmID')[0].value !== '') {
		newElementID = groupForm.getElementsByClassName('elmID')[0].value;
	} else {
		// no id supplied, we'll just use the next one.
		while (document.contains(document.getElementById('elm' + nextAutoIdNum))) {
			nextAutoIdNum++
		}
		newElementID = 'elm' + nextAutoIdNum
	}

	var bgImgFile = getFileProperties(groupForm, 'bgImgFile');

	context = {
		id: newElementID,
		// width: groupForm.getElementsByClassName('width')[0].value || 400,
		// height: groupForm.getElementsByClassName('height')[0].value || 200,
		parentID: $(this).data('value'),
		hidden: hidden,
		hiddenClass: hiddenClass,
		classes: classes,
		bgcolor: groupForm.getElementsByClassName('bgcolor')[0].value || 'transparent',
		bgImgFile: bgImgFile,
		bgImgFileName: bgImgFile.name,
		bgsize: groupForm.getElementsByClassName('bgsize')[0].value || 'auto'
	};

	addItem('#' + context.parentID, groupTemplate(context), context);

	$('#editGroup').modal('hide');

	return true;
};

var cleanClasses = function cleanClasses($e) {
	if ($e.hasClass('notresizable')) {
		$e.resizable("destroy");
		$e.removeClass('resizable').removeClass('ui-resizable');
	}
	if ($e.hasClass('resize-state-highlight')) {
		$e.removeClass('resize-state-highlight');
	}
	if ($e.hasClass('notdraggable')) {
		$e.removeClass('draggable').removeClass('ui-draggable');
	}
	if ($e.hasClass('drop-state-highlight')) {
		$e.removeClass('drop-state-highlight');
	}
	return $e;
}

var nodes;
var printHTML = function printHTML() {
	$('style[data-for]').appendTo('#root');
	$('#root div.img, #root div.group').each(function(i, e) {
		$e = cleanClasses($(e));

		$e.css('display', 'block');
	});
	nodes = $('#root').html();
	console.group('Source:');
	debug.log(nodes);
	//find a way to print JSON object of data to script tags and pull it back in later
	console.groupEnd();
	window.prompt("Copy and paste this into console to get source:", "copy(nodes);");
	$('style[data-for]', '#root').appendTo('head');

}

var addItem = function addItem(where, what, data) {
	//increment auto id
	nextAutoIdNum++;

	if (currSelection.context == "Edit") {
		$('#' + currSelection.id).remove();
	}

	//place the item
	$(where).append(what);

	//enable dragging so it can be placed. We enable and then destroy because we need to destroy prior to enabling and if for some reason it isn't already enabled when we try to destroy it will error out. This is the easiest way, otherwise I'd have to do checks to see if it is enabled before trying to destroy. That's harder...
	$('#' + data.id).resizable().draggable().draggable("destroy").draggable(draggableOptions);

	setEditContext(data);
};

var setDropdownValue = function setDropdownValue(e) {
	$selection = $(e.target);

	$btn = $selection.parents(".input-group-btn").find('.btn[data-toggle="dropdown"]');

	$btn.text($selection.text());
	$btn.val($selection.data('value'));
}

//initialize elements, attaching interactivity to them
var init = function init() {
	$('.draggable').each(function(i, el) {
		$el = $(el);

		var clone = $el.data('drag-clone-img') || 'clone';
		var cloneImg = clone;

		if (clone !== 'clone') {
			clone = function() {
				return '<img src="images/' + cloneImg + '"/>';
			};
		}

		$el.draggable({
			helper: clone,
			revert: true,
			revertDuration: 0
		});
	});
	$('.resizable').resizable();
	$('.selectable').selectable();
	$(".droppable").each(function(i, el) {
		$(el).droppable({
			accept: $(el).data('drop-accepts'),
			activeClass: "drop-state-active",
			hoverClass: "drop-state-hover",
			drop: function(event, ui) {
				$(this).addClass("drop-state-highlight");
				var dropHandlerType = $(this).data('drop-handler-type');
				switch (dropHandlerType) {
					case "swap":
						swapWith($(el).attr('id'), $(el).data('drop-handler-target'));
						break;
					case "show":
						show($(el).data('drop-handler-target'));
						break;
					case "hide":
						hide($(el).data('drop-handler-target'));
						break;
					case "hideGroupsExcept":
						hideGroupsExcept($(el).data('drop-handler-target'));
						break;
					case "custom":
						eval($(el).data('drop-handler-target'))(el);
						break
					default:
						// swapWith($(el).attr('id'), $(el).data('drop-handler-target'));
						console.log("Auto!");
						console.log("ui.draggable", ui.draggable);
						console.log("$(el)", $(el));
						var $elementDraggedHere = ui.draggable;
						var elementDraggedHereID = $elementDraggedHere.attr('id');
						$(el).trigger('droppedonto');
						$elementDraggedHere.trigger('dropped');
						// ui.trigger('dropped');
						break;
				}
			}
		});
	});
	$('.hoverable').hover(function(e) {
		$(e.target).attr('src', 'images/' + $(e.target).data('hover'));
	}, function(e) {
		$(e.target).attr('src', 'images/' + $(e.target).data('elm-img-file'));
	});
	$('style', '#root').appendTo('head');

}

var setEditContext = function setEditContext(contextData) {
	var $el;

	if (contextData.currentTarget && contextData.currentTarget.id === "root") {
		return;
	}
	// if(contextData.id === currSelection.id){return;}

	if (contextData.type && contextData.type.match(/^(mousedown|click)$/)) { //if context was a mouse click, harvest data from HTML
		$el = $(contextData.target);
	} else { //otherwise, this function was explicitly called and passed the data, grab the associated element
		$el = $("#" + contextData.id);
	}

	//grab data from data attributes instead of accepting the saved values because this is standardized and what the template expects
	//This is stupid. I should have used angular or something, but, whatever
	// contextData = $el.data();//can't user this because camel casing in data isn't supported
	contextData.clickHandler = $el.data('click-handler');
	contextData.clickHandlerTarget = $el.data('click-handler-target');
	contextData.clickHandlerType = $el.data('click-handler-type');
	contextData.dragCloneImg = $el.data('drag-clone-img');
	contextData.isDraggable = $el.data('draggable');
	contextData.dropAccepts = $el.data('drop-accepts');
	contextData.dropActiveFileName = $el.data('drop-active-file');
	contextData.dropDroppedFile = $el.data('drop-dropped-file');
	contextData.dropHandlerTarget = $el.data('drop-handler-target');
	contextData.dropHandlerType = $el.data('drop-handler-type');
	contextData.dropHoverFileName = $el.data('drop-hover-file');
	contextData.isDroppable = $el.data('droppable');
	contextData.isHidable = $el.data('hidable');
	contextData.hoverFileName = $el.data('hover-file');
	contextData.elmImgFileName = $el.data('elm-img-file');
	contextData.isResizable = $el.data('resizable');
	contextData.isRetina = $el.data('retina');
	contextData.isSelectable = $el.data('selectable');
	contextData.src = $el.data('src');
	contextData.id = $el.attr('id');
	contextData.class = $el.attr('class');
	contextData.originalClasses = $el.data('original-classes');
	contextData.parentID = $el.closest('.group').attr('id');

	// console.log('contextData', contextData);
	//show element values in edit ribbon
	$('#editBar').html(editBarTemplate(contextData));

	currSelection = contextData;

	$('#deleteElementBtn').on('click', deleteElement);
	$('#editElementBtn').on('click', editElement);
	$('#hideElementBtn').on('click', hideElement);
}

var deleteElement = function deleteElement(e) {
	//grab the parent
	deletedElm.parent = $('#' + currSelection.id).parent()[0];

	$('#editBar').html(''); //clear the edit bar
	deletedElmStyle.jqobj = $('style[data-for="' + currSelection.id + '"]').detach();
	deletedElm.jqobj = $('#' + currSelection.id).detach(); //detach the element, so it can be reinserted later if need be (http://api.jquery.com/detach/)
}

var undoDelete = function undoDelete() {
	if ( !! deletedElm.parent && deletedElm.jqobj) {
		if ( !! deletedElmStyle.jqobj) {
			$('head').append(deletedElmStyle.jqobj);
		}
		$(deletedElm.parent).append(deletedElm.jqobj);

	}

	deletedElm = {};
	deletedElmStyle = {};
}

Handlebars.registerHelper('addToGroupDD', function(items, options) {
	var out = '';

	$('#canvas div.group').each(function(i, e) {
		$e = $(e);
		out += '<li><a href="#" data-value="' + $e.attr('id') + '">' + $e.attr('id') + '</a></li>';
	});

	return out;
});

var hideElement = function hideElement(e) {
	$('#' + currSelection.id).hide(); //delete the element
}

//setEditContext gets called before this in order to harvest the data from the element before you pop the modal
var editElement = function editElement(e) {
	e.preventDefault();

	$e = $(e.currentTarget);

	currSelection.context = $e.data('context');

	//if we are adding, clear the current selection entirely
	if (currSelection.context === "Add") {
		currSelection = {
			context: "Add"
		};
	}

	var html = editImageTemplate(currSelection);

	$('#editImage .modal-content')
		.html(html)
		.find('.dropdown-menu li a').on('click', setDropdownValue).end()
		.find('.save').on('click', editImageCallback).end() //attach callback for save button
	.find('.addToElementWrapper li a').on('click', editImageCallback).end() //attach callback for add button;
	.find('input').each(function(i, e) {
		var $e = $(e);

		if (currSelection.context === "Add" && $e.data('default')) {
			console.log('in add');
			if ($e.attr('type') === "checkbox" && $e.data('default') === "checked") {
				$e.attr('checked', 'checked');
			}
		}
	});
}

// TODO: DRY this up with "editElement" function
var editGroup = function editGroup(e) {
	e.preventDefault();

	$e = $(e.currentTarget);

	currSelection.context = $e.data('context');

	//if we are adding, clear the current selection entirely
	if (currSelection.context === "Add") {
		currSelection = {
			context: "Add"
		};
	}

	var html = editGroupTemplate(currSelection);

	debug.log('html', html);

	$('#editGroup .modal-content')
		.html(html)
		.find('.dropdown-menu li a').on('click', setDropdownValue).end()
		.find('.save').on('click', editGroupCallback).end() //attach callback for save button
	.find('.addToElementWrapper li a').on('click', editGroupCallback).end() //attach callback for add button;
	.find('input').each(function(i, e) {
		var $e = $(e);

		if ($e.data('default')) {
			if ($e.attr('type') === "checkbox" && $e.data('default') === "checked") {
				$e.attr('checked', 'checked');
			}
		}
	});
}

var hideDevHandler = function hideDevHandler(e) {
	e.preventDefault();
	$dev = $('body.dev');
	//UNBIND ALL THE THINGS
	//We enable and then destroy because if for some reason it isn't already enabled when we try to destroy it will error out. This is the easiest way, otherwise I'd have to do checks to see if it is enabled before trying to destroy. That's harder...
	$dev.unbind('click')
		.find('#root div.img, #root div.group')
		.draggable().draggable('destroy')
		.resizable().resizable('destroy')
		.unbind('mousedown')
		.find('.has-tooltip').tooltip().tooltip('destroy');

	//take out of "dev mode"
	$('body').removeClass('dev');

	//init normal RPD functionality
	init();

	$('#showDev').show();

	$('#showDev').click(function(e) {
		e.preventDefault();
		$('body').addClass('dev');
		devInit();
	});
};

var devInit = function devInit() {
	$('style', '#root').appendTo('head');
	if ($('body').hasClass('dev') === true) {
		$dev = $('body.dev');

		$dev.on('click', '.dropdown-menu li a', setDropdownValue); //probably will need to be moved into editGroup function
		$dev.on('click', '#addElementBtn', editElement);
		$dev.on('click', '#addGroupBtn', editGroup);
		$dev.on('click', '#hideDev', hideDevHandler);
		$dev.on('click', '#showSource', function(e) {
			e.preventDefault();
			printHTML();
		});
		$dev.find('#showDev').hide();

		$dev.find('#pallet').draggable().end();
		$dev.find('div.img, div.group').mousedown(setEditContext).end();
		//if we don't init draggable/resizable, then destroy, then init again, it doesn't work. IDK why...
		$dev.find('#root div.img, #root div.group').draggable().draggable("destroy").draggable(draggableOptions).end()
		$dev.find('#root div.img, #root div.group').resizable().resizable("destroy").resizable().end()
		$dev.find('.has-tooltip').tooltip();

		$dev.keydown(function devkeypress(e) {
			//key bindings for selected element manipulations
			if (!currSelection.id //if nothing selected, abort
				|| !e.metaKey) { //if metaKey not held down, abort
				debug.log('no meta key, abort');
				return;
			}

			//make sure to only prevent defaults when we are actually capturing events
			if (e.which === 8) {
				console.log('deleteElement');
				// e.preventDefault();
				deleteElement(e);
			} else if (e.which === 72) {
				// e.preventDefault();
				hideElement(e);
			} else if (e.which === 90) {
				// e.preventDefault();
				undoDelete(e);
			}
		});

	}
}
devInit();

$.fn.preload = function() {
	this.each(function() {
		if (typeof this !== "String" && this.length <= 0) {
			return
		}
		$('<img />').attr('src', 'images/' + this).appendTo('body').css('display', 'none');
	});
}

var imgs = [];

$('#root div.img').each(function(i, el) {
	$el = $(el);
	imgs.push($el.data('drag-clone-img'));
	imgs.push($el.data('hover-file'));
	imgs.push($el.data('drop-active-file'));
	imgs.push($el.data('drop-hover-file'));
	imgs.push($el.data('drop-dropped-file'));
});

$(imgs).preload();


// Create an isEqual template. Can accept up to two variables that it compares for strict equality.
// Also, can accept a string instead of a second var if the user uses v2="desired string" in place of the second var
Handlebars.registerHelper('isEqual', function(v1, v2, options) {
	//make it so you can pass in a plain string instead of variables using v2="string" from the template
	if (arguments.length < 3) {
		options = v2;
		v2 = options.hash.v2;
	}

	if (v1 === v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});