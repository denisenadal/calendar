function batchRequest(){
	gapi.client.load('calendar', 'v3', function() {
		var week = getWeek();
		var batch = gapi.client.newBatch();
		console.log("batch started");
		for(cal in CAL_LIST){
			if(SUBJECT_LIST.indexOf(CAL_LIST[cal].subject)>=0){
				var request = gapi.client.calendar.events.list({
					'calendarId': CAL_LIST[cal].calID,
					'apiKey' : "AIzaSyDvK6WS3fU7B4maIWOwASaGBKfMQm9eCOI",
					'timeMin': week.sunday.toISOString(),
					'timeMax': week.saturday.toISOString(),
					'showDeleted': false,
					'singleEvents': true,
					'maxResults': 2500,
					'orderBy':  'startTime',
				});//ends request declaration
				batch.add(request);
			}//ends if cal in SubjectList
		}//end loop over CAL_LIST
		batch.execute(function(respMap,rawResp){
			console.log(respMap);
			for(cal in respMap){
				addSubjects(respMap[cal].result);
			}//end loop in callback
		});//end batch execute
	});//ends client load
}//ends batchRequest

function calRequest(subject) {
	subject=subject.replace(/^\s+|\s+$/g,'');
	var week = getWeek();
	var calID="";
	console.log(subject);
	for (cal in CAL_LIST){
		if(CAL_LIST[cal].subject==subject){
			calID = CAL_LIST[cal].calID;
			console.log(calID);
		}
	}
	gapi.client.load('calendar', 'v3', function() {
		var request = gapi.client.calendar.events.list({
			'calendarId': calID,
			'timeMin': week.sunday.toISOString(),
			'timeMax': week.saturday.toISOString(),
			'showDeleted': false,
			'singleEvents': true,
			'maxResults': 1000,
			'orderBy': 'startTime',
		});

		request.execute(function(resp) {
			addSubjects(resp);
		});//end request execute
	});//end gapi load
}//endcalRequest


//returns an object of dates for the current week
function getWeek() {
	today= new Date();
	today.setHours(0,0,0,0);
	if(WEEK_OFFSET != null){
		today.setDate(today.getDate() + (WEEK_OFFSET * 7))
	}
	var backup = new Date(today.valueOf());
	var dayofWeek = today.getDay();
	var week = {};
	console.log("get week ran");
	for (i=0;i<7;i++){
		var diff = today.getDate() - dayofWeek + i;
		if	(i==0){
			var sunday =	new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["sunday"]=sunday;
		}
		if	(i==1){
			var monday =	new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["monday"]=monday;
		}
		if	(i==2){
			var tuesday =	new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["tuesday"]=tuesday;
		}
		if	(i==3){
			var wednesday =	new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["wednesday"]=wednesday;
		}
		if	(i==4){
			var thursday =	new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["thursday"]=thursday;
		}
		if	(i==5){
			var friday =	new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["friday"]=friday;
		}
		if	(i==6){
			var saturday =	new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["saturday"]=saturday;
		}
	}
	return week;
}

//add weekdays to calendar: use on load & refresh
function addWeek(){
	$(document).ready(function(){
		var week = getWeek();
		var $SubjectTables = $(".subject-results");
		for(j=0;j<$SubjectTables.length;j++){
			var $dayLists = $SubjectTables.eq(j).find(".days");
			for (var day in week){
				for (i=0;i<6;i++){
					if ($dayLists.eq(i).hasClass(day) ){
						var date = (week[day]).getDate();
						var timestamp = ((week[day]).toISOString()).substring(0,10);
						$dayLists.eq(i).attr("id",timestamp);
						$dayLists.eq(i).find("span.date").text(date);
					}//end if it matches day of week
				}//end loop over dayLists
			}//end loop overy days in week
		}
	});
}//end addWeek

//creates new table and fills it with received data
function addSubjects(calendar){
	console.log("add subjects called");
	console.log(calendar);
	var $newSubject = generateTable(calendar);
	var sessions = calendar.items;
	var $dayLists = $newSubject.find(".days");
	//looping over each subject's sessions array
	for(j=0;j<sessions.length;j++){
		if(sessions[j].hasOwnProperty("start")){
			var session = sessions[j];
			var dateofSession = session.start.dateTime;
			//for each session, looping over days in week
			for(k=0;k<$dayLists.length;k++){
				var dayofWeek = $dayLists.eq(k).attr("id");
				//if date of session matches date of day
				if (sameDay(dayofWeek,dateofSession)){
					var optionalName ="";
					//print event name if different from calendar name
					if(!checkSameSubject(calendar,session)){
						optionalName = "<strong>"+session.summary+"</strong><br>";
					}
					var sessionStart = formatTime(session.start.dateTime);
					var sessionEnd = formatTime(session.end.dateTime);
					$dayLists.eq(k).find("ul.times").append('<li class="sessions">' + optionalName+sessionStart +' - '+sessionEnd+'</li>');
				}//end if match
			}//end loop over days
		}//end if has start time
	}//end loop over sessions
}//end function addSubjects

function sameDay(currentDay,dateofSession){
	dateofSession = new Date(Date.parse(dateofSession));
	currentDay = new Date(Date.parse(currentDay));
	currentDay.setHours(0,0,0,0);
	currentDay.setDate(currentDay.getDate() + 1);
	var nextDay = new Date(currentDay.valueOf());
	nextDay.setDate(nextDay.getDate() + 1);
	if( dateofSession > currentDay && dateofSession < nextDay){
		return true;
	}
	else{
		return false;
	}
}

function generateTable(calendar){
	var name = (calendar.summary).toLowerCase();
	name = name.replace(/\s+/g, '-');
	if (name == "tutoring543@gmail.com"){
		name = "tutoring-calendar";
	}
	var $template = $("#template-table")
	//creates table if it doesn't exist
	if(document.getElementById(name) == null){
		var $newSubject = $template.clone();
		var displayName = name.replace('-'," ");
		$newSubject.find("#subject-heading").text(displayName);
		$newSubject.attr("id",name);
		$newSubject.insertAfter($template);
		$newSubject.show();
		addIcon($newSubject,displayName);
		var color = $(".subject-choice:contains("+displayName+")").css("background-color");
		$newSubject.css({"color":color});
		$newSubject.find("svg").css({"fill":color});
	}//clear table if already exists
	else{
		var $newSubject = $("#"+name);
		var $dayLists = $newSubject.find(".times li").text("");
	}
	return $newSubject;
}

function checkSameSubject(calendar,session){
	var sessionSummary = session.summary.toLowerCase();
	var calSummary =  calendar.summary.toLowerCase();
	if(session.summary.toLowerCase() ==calendar.summary.toLowerCase()){
		return true;
	}
	else{
		return false;
	}
}

//formats dateTime string for display
function formatTime(dateTime){
	dateTime	= new Date(Date.parse(dateTime));
	dateTime= dateTime.toLocaleTimeString('en-US', { hour12: true,	hour:"numeric",minute:"2-digit" });
	return dateTime;
}
//chooses to delete or create a table
function toggleSubject($elem){
	console.log("toggleSubject called");
	var subject = $elem.text();
	if(document.getElementById(subject) == null){
		changeColor($elem,"active");
		SUBJECT_LIST.push(subject);
		calRequest(subject);
	}
	else {
		$("#"+subject).remove();
		SUBJECT_LIST = SUBJECT_LIST.filter(function(item) {
			return item !== subject;
		});
		changeColor($elem, null);
		console.log("hide element");
	}
}

function addIcon($newSubject,displayName){
	for(i=0;i<CAL_LIST.length;i++){
		if(CAL_LIST[i].subject == displayName){
			$newSubject.find(".icon-wrap").html(CAL_LIST[i].icon);
		}
		else if (CAL_LIST[i].subject == "organic chemistry" && displayName == "tutoring calendar") {
			$newSubject.find(".icon-wrap").html(CAL_LIST[i].icon);
		}
	}
}
function changeColor($elems, status){
	if(status == "active"){
		$.each($elems,function(i,v){
			var color = COLORS[CAL_COUNT];
			CAL_COUNT++
			if(CAL_COUNT > 5){
				CAL_COUNT = 0;
			}
			$elems.eq(i).css({"background-color":color,"color":"#fff"});
			$elems.eq(i).find("svg").css({"fill":"#fff"});
		});
	}
	else{
		$elems.css({"background-color":"#fff","color":"#aaa"});
		$elems.find("svg").css({"fill":"#aaa"});
	}
}
