//event handlers

$(document).ready(function(){
	addWeek();
	//event listener for active class

	//add or remove subjects
	$(".subject-choice").click(function(){
		toggleSubject($(this));
		$(this).toggleClass("active-subject")
	});
	//change week displayed
	$(".week-nav").click(function(){
		console.log("week nav clicked");
		if($(this).attr('id') == "prev-week" ){
			WEEK_OFFSET += -1;
			console.log("last week");
		}
		else if($(this).attr('id') == "next-week" ){
			WEEK_OFFSET += 1;
			console.log("next week");
		}
		else{
			WEEK_OFFSET = 0;
		}
		addWeek();
		batchRequest();
	});
});


function initCal() {
	var $elems = $(".active-subject");
	changeColor($elems,"active");
	gapi.client.init({
		'apiKey': "AIzaSyDvK6WS3fU7B4maIWOwASaGBKfMQm9eCOI"
	}).then(function() {
		console.log("gapi init");
		batchRequest();
	}, function(reason) {
		console.log('Error: ' + reason.result.error.message);
	});
}//ends initCal


gapi.load('client', initCal);
