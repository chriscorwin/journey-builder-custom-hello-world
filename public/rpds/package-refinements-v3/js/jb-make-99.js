$('head').append('<style>.canvas-view-swim-lanes.w99 .canvas-view-swim-lane-header {	background-image: none;	background-color: rgba(255, 192, 203, 0.29);	height: 900px;	z-index: 0 !important;	width: 99px;	border-right: 1px solid rgba(196, 0, 34, 0.08);}</style>');
$('head').append('<style>.canvas-view-swim-lanes .canvas-view-swim-lane-headers {z-index: 0}</style>');
$('head').append('<style>.canvas-view-activities .activity {width: 33px; outline: 1px solid limegreen;}</style>');
$('head').append('<style>.canvas-view-activities .activity .icon.ui-draggable {left: 0;}</style>');

$(".canvas-view-swim-lanes.w160").removeClass('w160').addClass('w99');

$(".canvas-view-swim-lanes.w99 .canvas-view-swim-lane-header").each(function(index, element) {
	if ($(this).width() > 0) {
		console.log($(this).width());
		var newWidth = 99;
		// var newWidth = Math.round($(this).width() / 2);
		$(this).width(newWidth);
	}
	if ($(this).position().left > 0) {
		// console.log($(this).position().left);
		var newLeft = (99 * index);
		$(this).css('left', newLeft + 'px');
	}
});

$(".canvas-view-activities .activity").each(function(index, element) {
	if ($(this).width() > 0) {
		console.log($(this).width());
		var newWidth = 33;
		// var newWidth = Math.round($(this).width() / 2);
		$(this).width(newWidth);
	}
	if ($(this).position().left > 0) {
		// console.log($(this).position().left);
		var newLeft = (33 * (index));
		$(this).css('left', newLeft + 'px');
	}
});


$(".canvas-view-activities .activity .icon.ui-draggable").each(function(index, element) {

	if ($(this).position().left > 0) {
		// console.log($(this).position().left);
		var newLeft = $(this).position().left - 9;
		$(this).css('left', newLeft + 'px');
	}
});



// while ($($('.activity-list')[0]).children().length > 1) {
// 	$($('.activity-list')[0]).children()[1].remove();
// }
// while ($($('.activity-list')[2]).children().length > 1) {
// 	$($('.activity-list')[2]).children()[1].remove();
// }

// $('.split-line').each(function() {
// 	if ($(this).height() > 0) {
// 		console.log($(this).height());
// 		var newHeight = Math.round($(this).height() / 2);
// 		$(this).height(newHeight);
// 	}
// });

// $('.activity').each(function() {
// 	if ($(this).height() > 0) {
// 		console.log($(this).height());
// 		var newHeight = Math.round($(this).height() / 2);
// 		$(this).height(newHeight);
// 	}
// 	if ($(this).position().top > 0) {
// 		console.log($(this).position().top);
// 		var newTop = Math.round($(this).position().top / 2);
// 		$(this).css('top', newTop + 'px');
// 	}
// //*
// 	if ($(this).width() > 0) {
// 		console.log($(this).width());
// 		var newWidth = Math.round($(this).width() / 2);
// 		$(this).width(newWidth);
// 	}
// 	if ($(this).position().left > 0) {
// 		console.log($(this).position().left);
// 		var newLeft = Math.round($(this).position().left / 2);
// 		$(this).css('left', newLeft + 'px');
// 	}
// //	*/
// });

// $('.path-duration').addClass('fade');


// $('.activity.rollup').removeClass('rollup').addClass('email').find('.canvas-name').addClass('fade');