"use strict";

/*!
 *  Nudge
 *  Copyright (C) 2012 Skiggle Pty Ltd
 *
 *  Designed by Chris Nolet (@chrisnolet)
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


// JavaScript functions for the Nudge toolbar

// Global variables
var _target = null;
var _mode = "position";


// jQuery ready
$(document).ready(function() {

if ($('body').hasClass('dev') === true) {} else {

		// Add selection box
		var box = '\
		<div class="nudge-box" >\
			<p style="\
				position: absolute;\
				margin: 0;\
				padding: 0;\
				left: 4px;\
				top: 4px;\
				font: 15px \'Helvetica Neue\', Helvetica, Arial, sans-serif;\
				color: #005;\
			"></p>\
		</div>\
	';
		$("body").append(box);

		// This is taken care of in edit bar now
		// Add output box
		// var output = '\
		// 	<div class="ui-draggable" id="nudge-output">\
		// 		<pre id="nudge-output-paragraph"></pre>\
		// 	    <a href="#" class="btn btn-block btn-danger" id="deleteElement">\
		// 	        <span class="glyphicon glyphicon-trash"></span> Delete Element</a>\
		// 		<div id="instructions"><p>Use the arrow keys to nudge this element around on the page.</p>\
		// 		<p>To resize elements, use the I, K, J and L keys.</p>\
		// 		<p>Click the element again to exit repositioning mode.</p></div>\
		// 	</div>\
		// ';
		// $('body').append(output);
		// $('#nudge-output').draggable();


		// 'Select All' action
		$("#nudge-select-all").click(function(e) {
			e.preventDefault();
			selectText("nudge-output-paragraph");
		});

		// Attach click handler
		var elements = 'h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, cite, code, del, dfn, em, img, q, s, samp, small, strike, strong, sub, sup, tt, var, dd, dl, dt, li, ol, ul, fieldset, form, label, legend, button, table, caption, tbody, tfoot, thead, tr, th, td, div, footer, input, html';
		$(elements).mousedown(onClick);

		// Attach keypress handler
		$("body").keydown(onKeyDown);
}

});

// Save mode selection
function setMode(mode) {

	// Deselect the previous mode
	$("#nudge-" + _mode).removeClass("active");

	// Remember the mode
	_mode = mode;

	// Hightlight the selected mode
	$("#nudge-" + _mode).addClass("active");
}

// Element clicked
function onClick(event) {
	//if clicking on "show source"
	if(event.target.id.match('showSource|moveDev')){return;}

	// Skip if not in dev mode
	if (! $('body').hasClass('dev')
		|| event.target.id.lastIndexOf('nudge-', 0) === 0) {// Skip and do nothing if element id begins with 'nudge-'
		return;
	}else if(event.target === _target){// Skip repeated events
		$('body').one('mouseup', function() {
			moveHightlightBox($("#" + event.target.id));
		})

		moveHightlightBox($("#" + event.target.id));

	}else if (event.target.id === "") {// Warn and skip if item does not have an element id


		if(document.getElementById('root').contains(document.getElementById($(event.target).parent().attr('id'))) === true)	{
			$(event.target).parent().trigger('mousedown');
			// return;

		} else {
			//ignore if dragging
			if(!$(event.target).hasClass('nudge-box')){
				clearTarget();
			};

			// return;
		}

	}else if(document.getElementById('root').contains(document.getElementById(event.target.id)) !== true)	{
		clearTarget();

		// return;
	}else{
		clearTarget();//if clicking on another element that needs selected, make sure to clear the current target first

		// Prevent default click action
		event.preventDefault();

		$('#nudge-output').show();
		// Remember target
		_target = event.target
		$('#deleteElement').off('mousedown');

		// Get jQuery object for target
		var object = $("#" + _target.id);
		var objectStyleBlock = $("#style-for-" + _target.id);

		//set opacity on target
		object.fadeTo(0, .5);

		// Show the highlight box
		moveHightlightBox(object)//.show();//don't show because that screws it up when you go to drag

		$('#deleteElement').one('mousedown', function(){
			object.remove();
			objectStyleBlock.remove();
			$('.nudge-box').mousedown();
		});


	}
}

function clearTarget() {
	// reset opacity on target
	$(_target).fadeTo(0, 1);

	// Reset the target
	_target = null;

	// Hide the highlight box
	$('#nudge-output').hide();
}

function moveHightlightBox(object) {

	// Get actual element width and height
	var width = cssWidth(object);
	var height = cssHeight(object);

	// Get jQuery object for the highlight box
	var box = $(".nudge-box");

	box.css(object.offset());
	box.width(object.innerWidth());
	box.height(object.innerHeight());

	// Set the label text
	//$(".nudge-box > p").html("<b>#" + _target.id + "</b> (" + object.innerWidth() + ", " + object.innerHeight() + ")");

	// Set the output text
	var theHTML = ""
		+ "   left: " + object.css("left") + ";<br/>"
		+ "    top: " + object.css("top") + ";<br/>"
		+ "  width: " + width + "px;<br/>"
		+ " height: " + height + "px;"

	$("#nudge-output-paragraph").html(theHTML);

	// Return the jQuery object for chaining
	return box;
}

function cssWidth(object) {

	// See if the object resizes with a 'fudge' factor
	var start = object.width();
	object.css("width", "+=0");
	var fudge = object.width() - start;

	// Restore the object to its original size
	object.css("width", "-=" + (2 * fudge));

	// Return the width or the inner width accordingly
	if (fudge === 0) {
		return object.width();
	} else {
		return object.innerWidth();
	}
}

function cssHeight(object) {

	// See if the object resizes with a 'fudge' factor
	var start = object.height();
	object.css("height", "+=0");
	var fudge = object.height() - start;

	// Restore the object to its original size
	object.css("height", "-=" + (2 * fudge));

	// Return the width or the inner width accordingly
	if (fudge === 0) {
		return object.height();
	} else {
		return object.innerHeight();
	}
}

// Key pressed
function onKeyDown(event) {

	// Skip if target is null
	if (_target === null) {
		return;
	}

	// Adjust action for different modifiers
	var sizeModifier = (event.altKey || event.ctrlKey || event.metaKey);
	var speedModifier = event.shiftKey;

	// Choose attribute names based on the current mode
	var xAttribute;
	var yAttribute;

	switch (_mode) {
		case "position":
			xAttribute = "left";
			yAttribute = "top";
			break;

		case "margin":
			xAttribute = "margin-left";
			yAttribute = "margin-top";
			break;

		case "padding":
			xAttribute = "padding-left";
			yAttribute = "padding-top";
			break;
	}

	// Get jQuery object for target
	var object = $("#" + _target.id);

	// Respond to arrow keys and modifiers
	switch (event.keyCode) {

		// Left key
		case 37:
		case 65:
			object.css((sizeModifier ? "width" : xAttribute), "-=" + (speedModifier ? 10 : 1));
			break;

		// Up key
		case 38:
		case 87:
			object.css((sizeModifier ? "height" : yAttribute), "-=" + (speedModifier ? 10 : 1));
			break;

		// Right key
		case 39:
		case 68:
			object.css((sizeModifier ? "width" : xAttribute), "+=" + (speedModifier ? 10 : 1));
			break;

		// Down key
		case 40:
		case 83:
			object.css((sizeModifier ? "height" : yAttribute), "+=" + (speedModifier ? 10 : 1));
			break;

		// Resize-left key
		case 74:
			object.css("width", cssWidth(object) - (speedModifier ? 10 : 1));
			break;

		// Resize-up key
		case 73:
			object.css("height", cssHeight(object) - (speedModifier ? 10 : 1));
			break;

		// Resize-right key
		case 76:
			object.css("width", cssWidth(object) + (speedModifier ? 10 : 1));
			break;

		// Resize-down key
		case 75:
			object.css("height", cssHeight(object) + (speedModifier ? 10 : 1));
			break;

		default:
			return;
	}

	// Reposition the highlight box
	moveHightlightBox(object);
}

// Select text
function selectText(id) {

	// Note: Borrowed from 'http://stackoverflow.com/questions/985272'

	// Get the text element from the element id
	var text = document.getElementById(id);

	// Select the text element
	if (document.body.createTextRange) {

		// Microsoft IE
		var range = document.body.createTextRange();
		range.moveToElementText(text);
		range.select();

	} else if (window.getSelection) {

		//  Safari, Chrome, Firefox and Opera
		var selection = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

