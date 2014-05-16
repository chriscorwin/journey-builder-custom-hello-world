var show = function show(el) {
	$('body').hasClass('dev');
	if($('body').hasClass('dev')){return;}
	//these should accept arrays
	$(el).removeClass('hide');
};

var hide = function hide(el) {
	if($('body').hasClass('dev')){return;}
	$(el).addClass('hide');
};

var swapWith = function swapWith(hideMe, showMe) {
	if($('body').hasClass('dev')){return;}
	hide(hideMe);
	show(showMe);
}

var hideGroupsExcept = function hideGroupsExcept(what) {
	if($('body').hasClass('dev')){return;}

	console.log(what);

	hide('.group');
	show('#root');
	show(what);
}

//used to call custom functions,
// f - custom function name
// t - param (usually DOM element)
var custom = function custom(f, t) {
	eval(f)(t);
}