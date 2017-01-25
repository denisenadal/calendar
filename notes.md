*G-calendar app*
**credentials**
{"web":
    {
        "client_id":"781532624008-amifuh5lt04sdbba90gojoq2tr656rse.apps.googleusercontent.com",
        "project_id":"dixie-gcalendar",
        "auth_uri":"https://accounts.google.com/o/oauth2/auth",
        "token_uri":"https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
        "client_secret":"q1qLJ3GKFzchP03TP02VpaCc",
        "javascript_origins":["http://dixie.edu","http://wpdev.dixie.edu","http://localhost:8000"]
    }
}

**Project flow**
***Client Set up***
App requests authorization for calendar
Set default query parameters:
    calendarId
    clientID
    Events by Name(summary)
    for current work week (monday <= today until friday >= today)
    group by subject, then day,
        then sort by start time.
* default query parameters should be overwritten by user selections to save inputs from prior requests
Create JSON to store colors, headings & icons for each subject
build schedule template


***helpers***
* insertSchedule(eventsList)
    inserts data into schedule template
    use styleJSON to style new data
    add completed schedule to DOM

* nextWeek()  & lastWeek()
calculates start and end date for previous or next week, and calls makeRequest() with new dates

* newSubject()
makes new request with updated subject array

***Authorized app***
makeRequest(startDate, endDate, subjects)
    checks authorization
    makes api call
        loads calendar data
        returns eventsList JSON
        callback, insertSchedule(eventsList)

**HTML**
Selection Table of subject options grouped by college.
    items with selected class get sent to API request as items in subjects array
Empty week template can be saved in JS to be added to DOM after API call
