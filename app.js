//returns an object of dates for the current week
function getWeek() {
	today= new Date();
	if(WEEK_OFFSET != null){
		today.setDate(today.getDate() + (WEEK_OFFSET * 7))
		console.log(today);
	}
	var backup = new Date(today.valueOf());
	var dayofWeek = today.getDay();
	var week = {};
	console.log("get week ran");
	for (i=0;i<6;i++){
		var diff = today.getDate() - dayofWeek + i;
		if  (i==0){
			var sunday =  new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["sunday"]=sunday;
		}
		if  (i==1){
			var monday =  new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["monday"]=monday;
		}
		if  (i==2){
			var tuesday =  new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["tuesday"]=tuesday;
		}
		if  (i==3){
			var wednesday =  new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["wednesday"]=wednesday;
		}
		if  (i==4){
			var thursday =  new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["thursday"]=thursday;
		}
		if  (i==5){
			var friday =  new Date(today.setDate(diff));
			today= new Date(backup.valueOf());
			week["friday"]=friday;
		}
	}
	console.log(week);
	return week;
}


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
						$dayLists.eq(i).find("span.date").text(date);
					}//end if it matches day of week
				}//end loop over dayLists
			}//end loop overy days in week
		}
	});
}//end addWeek

//formats gapi response for display by topic
function parseEvents(events){
	console.log("events parsed");
	var subjects =[];
	for(j=0;j<EVENT_TYPES.length;j++){
		var subjectName = EVENT_TYPES[j];
		subjects.push({subject:subjectName,sessions:[]});
		for (i=0;i<events.length;i++){
			if (events[i].summary.includes(subjectName)){
				subjects[j].sessions.push(events[i]);
			}//end if event matches subject
		}//end events loop
	}//end subjects loop
	addSubjects(subjects);
}//end parseEvents function


//creates new table and fills it with received data
function addSubjects(subjects){
	var $template = $("#template-table")
	console.log("add subjects called");

	//looping over subjects array
	for(i=0;i<subjects.length;i++){
		console.log(subjects[i]);
		var name = subjects[i].subject;
		//check if subject does not exist
		if(document.getElementById(name) == null){
			var $newSubject = $template.clone();
			$newSubject.find("#subject-heading").text(name);
			$newSubject.attr("id",name);
			$newSubject.insertAfter($template);
			$newSubject.show();
			var $dayLists = $newSubject.find(".days");

			//looping over each subject's sessions array
			for(j=0;j<subjects[i].sessions.length;j++){
				var dateofSession = subjects[i].sessions[j].start.dateTime;
				dateofSession = new Date(Date.parse(dateofSession));
				dateofSession = dateofSession.getDate();

				//for each session, looping over days in week
				for(k=0;k<$dayLists.length;k++){
					var dayofWeek = $dayLists.eq(k).find(".date").text();
					//if date of session matches date of day
					if (dateofSession == dayofWeek){
						var sessionStart = formatTime(subjects[i].sessions[j].start.dateTime);
						var sessionEnd = formatTime(subjects[i].sessions[j].end.dateTime);
						$dayLists.eq(k).find("ul.times").append('<li class="sessions">'+sessionStart +' - '+sessionEnd+'</li>');
					}//end if match
				}//end loop over days
			}//end loop over sessions
		}//end if not exists
	}//end loop over subjects
}//end function addSubjects

//formats dateTime string for display
function formatTime(dateTime){
	dateTime  = new Date(Date.parse(dateTime));
	dateTime= dateTime.toLocaleTimeString('en-US', { hour12: true,  hour:"numeric",minute:"2-digit" });
	return dateTime;
}
//chooses to delete or create a table
function toggleSubject($elem){
	console.log("toggleSubject called");
	var subject = $elem.text();
	if(document.getElementById(subject) == null){
		EVENT_TYPES.push(subject);
		makeApiCall();
	}
	else {
		$("#"+subject).remove();
		EVENT_TYPES = EVENT_TYPES.filter(function(item) {
			return item !== subject;
		});
		console.log("hide element");
	}
}
