//functions to call other stuff

$(document).ready(function(){
	addWeek();
	$(".subject-choice").click(function(){
		toggleSubject($(this));
	});
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
		makeApiCall();
	});
});
