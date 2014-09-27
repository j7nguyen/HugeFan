// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var APP_GLBLS = {

}

var CATEGORY_OPTIONS = [
	{
		email: 'movie.lover@rt.com', 
		category: 'movies'
	},
	{
		email: 'sportsFan600@gmail.com', 
		category: 'sports'
	}
]

function main() {
	setUpCategoryAutofill();
}

function setUpCategoryAutofill() {
	var categoryBox = $('#category-suggestion-container');
	categoryBox.append('<ul id="category-suggestions">');
	for (var key in CATEGORY_OPTIONS) {
		categoryBox.append($('<li>' + CATEGORY_OPTIONS[key].email + '</li>'));
	}	
	categoryBox.append('</ul>');
	categoryBox.hide();
	$('#category').focus(function(){categoryBox.show()});
	$('#category').blur(function() {categoryBox.hide()})

}

$(document).ready(main);
