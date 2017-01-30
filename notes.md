#G-calendar app#
##credentials##
{"web":
		{
				"client_id":"781532624008-amifuh5lt04sdbba90gojoq2tr656rse.apps.googleusercontent.com",
				apiKey : "AIzaSyDvK6WS3fU7B4maIWOwASaGBKfMQm9eCOI",
				"project_id":"dixie-gcalendar",
				"auth_uri":"https://accounts.google.com/o/oauth2/auth",
				"token_uri":"https://accounts.google.com/o/oauth2/token",
				"auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
				"client_secret":"q1qLJ3GKFzchP03TP02VpaCc",
				"javascript_origins":["http://dixie.edu","http://wpdev.dixie.edu","http://localhost:8000"]
		}
}

##TODOS##
Options to resolve events issues:
	#1 - event subject gets own calendar - MUST stay on OWN calendar
	#2 - all events on same calendar, must use consistent naming

#EXPERIMENTS#
Try authentication again - see how hard it is
read up on how it works exactly-
once "running" test on a server to test it with diff ips & clients

spam server with a request loop to see how many before locked out of unauthenticated requests
gapi claims i get 1million requests a day?
