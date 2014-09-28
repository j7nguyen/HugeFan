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

	// list of the categories available to search on
	categories: [
		{
			email: 'movie.lover@rt.com', 
			name: 'Movie Lover',
			category: 'Movies',
			placeholderPrompt: '(put movie here)',
		},
		{
			email: 'xX_music_Xx@gmail.com', 
			name: 'Music Guru',
			category: 'Music',
			placeholderPrompt: "(put artist here)",
		}
	],
	
	// will contain array of the words in the result
	resultWords: [],

	// index into resultWords
	wordIndex: 0,

	selectedCategory: null, // stores category selected
	tipsEnabled: false,		// keeps track of whether or not tips are enabled

	wikiEnable: true,

	// DOM associations to input boxes
	resultsID: '#results',
	categoryID: '#category',
	subjectID: '#subject-input',
}

/*
 * calls set up functions
 * called when doc is ready
 */
function main() {
	$('#send').click(function() {
		getResult(false);
	});

	setUpGreeting();
	setUpCategoryAutofill();
	setUpResultsBox();
	setUpTips();
	setUpSubjectBox();

	$( "#tips" ).animate(
  		{ opacity: 1}, 
  		500, 
  		function() {
		    $( "#tips" ).animate(
		    	{ opacity: .2 }, 
		    	500, 
		    	function() {
				    $( "#tips" ).animate(
				    	{ opacity: 1 }, 
				    	500, 
				    	function() {
				    		// finished animation
				    	});
				});
		}
	);
}

/*
 * sets up subject box, which is used to contain the query.
 * as keys are entered, if tips are enabled a prompt appears in the body
 */
function setUpSubjectBox() {
	$(APP.subjectID).keydown(function() {
		if (APP.tipsEnabled) {
			$(APP.resultsID).attr('placeholder', 
				'(start typing here to see result)');
		}
	});
}

/*
 * set up tips handler and interactions
 */
function setUpTips() {
	var tipsButton = $('#tips');

	// show first hint if tips are enabled
	if (APP.tipsEnabled) { 
		$(APP.categoryID).attr('placeholder', 
			'');
	}
		
	// set up tick handler (toggles style and hint presence)

	$('#tips').click(function() {

		APP.tipsEnabled = !APP.tipsEnabled;
		
		if (APP.tipsEnabled) {

			$(APP.categoryID).attr('placeholder', '(put category here)');
			$(APP.subjectID).attr('placeholder', '(put query here)');
			$(APP.resultsID).attr('placeholder', 
				'(start typing here to see result)');

			tipsButton.html("&nbsp;&nbsp;&nbsp;X");
			tipsButton.css({"color":"#9E9E9E","text-shadow":"0 0 3px #fff"});
		} else {
			tipsButton.html("Tips");
			tipsButton.css({"color":"#9F9F9F","text-shadow":"none"});
			$(APP.categoryID).attr('placeholder', '');
			$(APP.subjectID).attr('placeholder', '');
			$(APP.resultsID).attr('placeholder', '');
		}

	});
}



/*
 * sets up greeting which shows up in subject line
 * depends on the time of day
 */
function setUpGreeting() {
	var time = new Date();
	var currentHour = time.getHours();
	if (currentHour < 5 || currentHour > 17) {
		$('#greeting').text('Good Evening');
	} else if (currentHour < 12) {
		$('#greeting').text('Good Morning');
	} else {
		$('#greeting').text('Good Afternoon');
	}
}


/*
 * sets up the autofill dropdown when the category box is pressed (To field)
 */
function setUpCategoryAutofill() {
	var categoryBox = $('#category-suggestion-container');

	// create dropdown (initially hidden)
	categoryBox.append('<ul id="category-suggestions">');
	for (var key in APP.categories) {
		var category = APP.categories[key];
		var categoryItem = $('<li>' + category.name + '<br />'
			+ '<span class="subContact"><b>' + category.category + '</b> '
			+ category.email + '</span></li>');

		(function(category) {
			categoryItem.click(function() {
				categorySelectionHandler(category);
			});
		})(category);

		categoryBox.append(categoryItem);
	}	
	categoryBox.append('</ul>');
	categoryBox.hide();

	// disable typing in keys in To: field (user's should use drop down)
	$(APP.categoryID).keydown(function() {return false});

	// show category box on focus / unfocus
	$(APP.categoryID).focus(function(){
		$(APP.categoryID).val('');
		$(APP.categoryID).attr('placeholder', '');
		categoryBox.show();
	});
}

/*
 * called when a category is selected, populates the TO field, hides the 
 * dropdown and shows hints as necessary
 */
function categorySelectionHandler(category) {
	$(APP.categoryID).val(category.email);
	if (APP.tipsEnabled) {
		$(APP.subjectID).attr('placeholder', category.placeholderPrompt);
	}
	$('#category-suggestion-container').hide();
	APP.selectedCategory = category.category;
}

/*
 * sets up the results box, which corresponds to the body
 * ajax request is made when the field is selected, result is shown as keys
 * are pressed in the body
 */
function setUpResultsBox() {
	$(APP.resultsID).focus(function() { getResult(true) });
	$(APP.resultsID).keydown(displayMoreQuery);
}

/*
 * called when keydown is made in the body field.
 * shows more results in the body
 */
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

/*
 * makes ajax request using user's query, messes around with hints as necessary
 */

function getResult(incrementalDisplay) {
	var category = APP.selectedCategory;
	var query = $('#subject-input').val();

	if (!category || query == '') {
		$(APP.resultsID).attr('placeholder', 
			'Please fill both the to and subject fields out, then click here.');

	} else {

		var ajax = '/topics.json?topic='+category+'&query='+query;
		console.log(ajax);
		$.getJSON(ajax, null, function(data) {
			var result = data.talking_points;

			if (incrementalDisplay) {
				APP.wordIndex = 0;
				APP.resultWords = result.split(' ');					
			} else {
				$(APP.resultsID).val(result);
			}
		});

		if (APP.wikiEnable) { addWikipediaAdditions(query); }
	}
}

function addWikipediaAdditions(query) {
	var ajax = '/proxy?url=http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=';
	ajax += toTitleCase(query);

	$.getJSON(ajax, null, function(data) {
		if (!data.query.pages['-1']) {
			console.log('entered');
			for (var key in data.query.pages) {
				var wikiResults = data.query.pages[key].extract
				wikiResults = $(wikiResults).text();
				wikiResults = wikiResults.substring(0, 
					wikiResults.lastIndexOf(".") + 2);
				var wikiWords = wikiResults.split(' ');
				APP.resultWords.push('\n\n');
				APP.resultWords.push.apply(APP.resultWords, wikiWords);
			}
		}
	});
}

// ty stack overflow 
// http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$(document).ready(main);
