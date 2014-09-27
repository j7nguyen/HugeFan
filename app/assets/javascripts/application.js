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

var APP = {
	categories: [
		{
			email: 'movie.lover@rt.com', 
			name: 'Movie Lover',
			category: 'Movies',
		},
		{
			email: 'sportsFan600@gmail.com', 
			name: 'Sports Fan',
			category: 'Sports',
		}
	],
	tempFillerText: "Hey John, \n\nBacon ipsum dolor sit amet short loin chicken pancetta, shankle cow salami brisket venison. Tongue chicken boudin meatloaf. Pork belly t-bone venison, corned beef short ribs tri-tip pork loin prosciutto bacon. Prosciutto cow porchetta ball tip, chuck leberkas frankfurter ground round salami shankle. \n\nBacon landjaeger meatball pancetta kevin pig venison leberkas beef ribs pork chop strip steak jerky tri-tip. Boudin corned beef filet mignon bresaola ground round bacon beef. Shankle beef drumstick strip steak, meatball shoulder tenderloin boudin kevin jowl turducken bacon venison. Shankle biltong cow pork loin, beef capicola beef ribs brisket pancetta salami. Jerky ham hock turkey cow pork chop, spare ribs t-bone landjaeger swine bacon short loin biltong kevin porchetta pastrami.\n\nTurducken salami shank shoulder pancetta spare ribs sausage jowl. Corned beef kevin t-bone ground round andouille sirloin. Pancetta capicola drumstick filet mignon prosciutto. Ham flank pork brisket kevin, tongue fatback sirloin beef leberkas hamburger short ribs.\n\nShoulder andouille pancetta, spare ribs landjaeger brisket meatball pork short ribs prosciutto strip steak filet mignon porchetta. Pork chop jerky pancetta short ribs jowl, hamburger pork pastrami landjaeger bresaola kevin beef. Tongue kevin meatloaf flank pork belly. Chicken porchetta sausage, prosciutto tenderloin filet mignon pancetta. Beef ribs biltong salami boudin, pig beef short ribs corned beef jowl ground round ham jerky sausage swine. Jerky tenderloin meatloaf corned beef chicken jowl.\n\nTri-tip hamburger drumstick porchetta beef ribs meatball ground round pork chop doner, pork belly salami. Shank turkey leberkas chicken venison pork loin ground round salami. Kielbasa flank ham hock, hamburger jerky ribeye leberkas pork loin venison jowl pork belly meatloaf brisket boudin tail. Short ribs pig frankfurter ribeye, pork belly drumstick ground round strip steak kevin tongue. Leberkas rump chuck frankfurter brisket beef ribs pork belly jowl shoulder flank meatloaf turducken pork. Kielbasa salami ham hock pork strip steak pork chop. Pancetta biltong tail pork belly short loin flank pork chop kevin sirloin fatback shoulder beef.\n\nDoes your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!",
	resultWords: [],
	wordIndex: 0,
	resultsID: '#results',
	categoryID: "#category",
}

function main() {
	setUpCategoryAutofill();
	setUpResultsBox();
}

function setUpCategoryAutofill() {
	var categoryBox = $('#category-suggestion-container');
	categoryBox.append('<ul id="category-suggestions">');
	for (var key in APP.categories) {
		var category = APP.categories[key];
		var categoryItem = $('<li>' + category.name + '<br />'
			+ '<span class="subContact"><b>' + category.category + '</b> '
			+ category.email + '</span></li>');
		categoryItem.click(categorySelectionHandler(category));
		categoryBox.append(categoryItem);
	}	
	categoryBox.append('</ul>');
	categoryBox.hide();

	// disable typing in keys in To: field (user's should use drop down)
	$(APP.categoryID).keypress(function() {return false});

	// show category box on focus / unfocus
	$(APP.categoryID).focus(function(){categoryBox.show()});
}

function categorySelectionHandler(category) {
	alert('called');
	$('#category-suggestion-container').hide()
}

function setUpResultsBox() {
	$(APP.resultsID).focus(getResult);
	$(APP.resultsID).keypress(displayMoreQuery);
}

function displayMoreQuery(e) {
	if ( APP.wordIndex < APP.resultWords.length ) {
		$(APP.resultsID).val( 
			$(APP.resultsID).val()
			+ APP.resultWords[APP.wordIndex] 
			+ ' ');
		APP.wordIndex++;
	}
	return false; // surpress the user input from being added
}

function getResult() {
	$(APP.resultsID).val('');

	// fill in ajax request here
	var result = APP.tempFillerText

	APP.wordIndex = 0;
	APP.resultWords = result.split(' ');
}

$(document).ready(main);
