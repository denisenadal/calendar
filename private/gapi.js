//GLOBAL VARIABLES
var CLIENT_ID =
var API_KEY =
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
var CAL_ID = 
var SUBJECT_LIST = [];
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
	}//endmakeapicall
