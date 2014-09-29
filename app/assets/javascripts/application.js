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
			email: 'musicfanatic99@gmail.com', 
			name: 'Music Gurl',
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

	wikiEnable: false,

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
	$("#tips").click(function(){
		$("#tipModal").css({"display":"block"});
	});
	$("#closeTips").click(function(){
		$("#tipModal").css({"display":"none"});
	});
	$("#next").click(function(){
		$("#tipModal .activeIMG").removeClass("activeIMG").next().addClass("activeIMG");
		$("#imgTOC .activeimgTOC").removeClass("activeimgTOC").next().addClass("activeimgTOC");
		if($("#imgTOC .activeimgTOC").length == 0){
			$("#imgTOC span:nth-child(1)").addClass("activeimgTOC");
			$("#tipModal img:eq(0)").addClass("activeIMG");
		}
	});

	imgCount = $('#tipModal img').length - 1;

	$("#previous").click(function(){
		$("#tipModal .activeIMG").removeClass("activeIMG").prev().addClass("activeIMG");
		$("#imgTOC .activeimgTOC").removeClass("activeimgTOC").prev().addClass("activeimgTOC");
		if($("#imgTOC .activeimgTOC").length == 0){
			$("#imgTOC span:nth-last-child(1)").addClass("activeimgTOC");
			$("#tipModal img:eq("+ imgCount +")").addClass("activeIMG");
		}
	});

	$("#body textarea").css({"height":window.innerHeight - ($("#body textarea").offset().top + 20)});

	var body = document.body, html = document.documentElement;
	var totalHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	if(window.innerWidth > window.innerHeight){
		$("#tipModal img").css({"height":window.innerHeight - 100, "width":"auto"});
		$("#tips").css({"padding-left":"5px", "width":"20%"});
		$("#send").css({"padding-right":"5px", "width":"19%"});
		$("#inboxHeader div:nth-child(1)").css({"padding-left":"1%", "width":"33%"});
	} else {
		$("#tipModal img").css({"width":window.innerWidth - 100, "height":"auto"});
	}
	$("#sendSummary").css({"height":window.innerHeight});
	$("#tipModal").css({"height":totalHeight});
	$("#title").click(function(){
		$("#sendSummary").css({"display":"block","left":"0","top":"0"});

	});
	$("#returnButton").click(function(){
		$("#sendSummary").animate(
  		{ left: window.innerWidth, opacity: 0}, 
  		200, function(){

  			$("#sendSummary").css({"opacity":"1","display":"none","left":"0","top":window.innerHeight});
  		});

	});

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
	$(APP.subjectID).keydown(function(e) {
		if (APP.tipsEnabled) {
			$(APP.resultsID).attr('placeholder', 
				'(start typing here to see result)');
		}

		var key = (e.keyCode ? e.keyCode : e.which);
		if (key == 13) {
			$(APP.resultsID).focus();
			getResult(true);
			return false;
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

	// $('#tips').click(function() {

	// 	APP.tipsEnabled = !APP.tipsEnabled;
		
	// 	if (APP.tipsEnabled) {

	// 		$(APP.categoryID).attr('placeholder', '(put category here)');
	// 		$(APP.subjectID).attr('placeholder', '(put query here)');
	// 		$(APP.resultsID).attr('placeholder', 
	// 			'(start typing here to see result)');

	// 		tipsButton.html("&nbsp;&nbsp;&nbsp;X");
	// 		tipsButton.css({"color":"#9E9E9E","text-shadow":"0 0 3px #fff"});
	// 	} else {
	// 		tipsButton.html("Tips");
	// 		tipsButton.css({"color":"#9F9F9F","text-shadow":"none"});
	// 		$(APP.categoryID).attr('placeholder', '');
	// 		$(APP.subjectID).attr('placeholder', '');
	// 		$(APP.resultsID).attr('placeholder', '');
	// 	}

	// });
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
	$(APP.subjectID).focus();
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
	$(APP.resultsID).val('');

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

				if (query == "rambo" || query == "Rambo") {
					result += "\n\nP.S. I'm a huge fan of Sylvester Stallone. Did you know that his first movie was a porn film called Kitty and Studs?";
				}

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
