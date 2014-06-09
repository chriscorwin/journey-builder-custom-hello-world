while ($($('.activity-list')[0]).children().length > 1) {
	$($('.activity-list')[0]).children()[1].remove();
}
while ($($('.activity-list')[2]).children().length > 1) {
	$($('.activity-list')[2]).children()[1].remove();
}

$('.split-line').each(function() {
	if ($(this).height() > 0) {
		console.log($(this).height());
		var newHeight = Math.round($(this).height() / 2);
		$(this).height(newHeight);
	}
});

$('.activity').each(function() {
	if ($(this).height() > 0) {
		console.log($(this).height());
		var newHeight = Math.round($(this).height() / 2);
		$(this).height(newHeight);
	}
	if ($(this).position().top > 0) {
		console.log($(this).position().top);
		var newTop = Math.round($(this).position().top / 2);
		$(this).css('top', newTop + 'px');
	}
//*
	if ($(this).width() > 0) {
		console.log($(this).width());
		var newWidth = Math.round($(this).width() / 2);
		$(this).width(newWidth);
	}
	if ($(this).position().left > 0) {
		console.log($(this).position().left);
		var newLeft = Math.round($(this).position().left / 2);
		$(this).css('left', newLeft + 'px');
	}
//	*/
});

$('.path-duration').addClass('fade');


$('.activity.rollup').removeClass('rollup').addClass('email').find('.canvas-name').addClass('fade');
