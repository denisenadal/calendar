//GLOBAL VARIABLES
var CLIENT_ID = "781532624008-amifuh5lt04sdbba90gojoq2tr656rse.apps.googleusercontent.com";
var API_KEY ="AIzaSyA9T6mlurcWf2Bxqk5XLMCsdUYQML3zQW8";
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
var CAL_ID = "dmail.dixie.edu_o8rcipn2b5um5tc9b1ssjuo0mo@group.calendar.google.com";
var EVENT_TYPES = ["Abdul","Matt","Nick"];
var WEEK_OFFSET = null;

//check authorization on load
	function handleClientLoad() {
		gapi.client.setApiKey(API_KEY);
		checkAuth();
	}
//checks to see if app is authorized, on callbak runs handleAuthResult
	function checkAuth() {
		gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true},
				handleAuthResult);
	}
//callback to handle results of checkAuth
	function handleAuthResult(authResult) {
		var authorizeButton = document.getElementById('authorize-button');
		//if authorized make makeApiCall
		if (authResult) {
			authorizeButton.style.visibility = 'hidden';
			makeApiCall();
		//else show authorization button
		} else {
			authorizeButton.style.visibility = '';
			authorizeButton.onclick = handleAuthClick;
		 }
	}
//handler to make authorization request
	function handleAuthClick(event) {
		gapi.auth.authorize(
			{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
			handleAuthResult);
		return false;
	}

//makes api call and handles results of authenticated request
	function makeApiCall() {
		var week = getWeek();
		gapi.client.load('calendar', 'v3', function() {
			var request = gapi.client.calendar.events.list({
				'calendarId': CAL_ID,
				'timeMin': week.sunday.toISOString(),
				'timeMax': week.friday.toISOString(),
				'showDeleted': false,
				'singleEvents': true,
				'maxResults': 1000,
				'orderBy': 'startTime',
			});

			request.execute(function(resp) {
				parseEvents(resp.items);
			});//end request execute
		});//end gapi load
	}//endmakeapicall
