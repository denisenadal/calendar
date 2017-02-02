//GLOBAL VARIABLES
var API_KEY ="AIzaSyDvK6WS3fU7B4maIWOwASaGBKfMQm9eCOI";
var SUBJECT_LIST = ["math","statistics","biology"];
var WEEK_OFFSET = null;
var CAL_COUNT = 0;
var COLORS = ["#741115","#f1141a","#ba1c21","#df4a2c","#97230b","#de090f"];
var CAL_LIST = [
	{"subject": "accounting","calID" : "jj4dukh0lqjbfbqlpsnmheu3io@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#accounting"></use></svg>'},
	{"subject": "biology","calID" : "g7dpq4viklgjm7fofmo3kuke5o@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#biology"></use></svg>'},
	{"subject": "business","calID" : "covj0l9uuupuerfidipmmvkp9o@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#business"></use></svg>'},
	{"subject": "chemistry","calID" : "07pfesig2ko7i3b88lk0cdve84@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#chemistry"></use></svg>'},
	{"subject": "communication","calID" : "oq3kbhi2pom3me9ll0jhkevi3g@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#communication"></use></svg>'},
	{"subject": "economics","calID" : "09v8rr4mibr378q5udcaqn0v54@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#economics"></use></svg>'},
	{"subject": "engineering","calID" : "pfbcjh2q9cl8pnr7osd45nvl8k@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#engineering"></use></svg>'},
	{"subject": "finance","calID" : "hb5d1mfcbhdknp3neg04cqjo5s@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#finance"></use></svg>'},
	{"subject": "foreign language","calID" : "ik42pjjr0qr4pvcjefqdmrrm90@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#foriegn-language"></use></svg>'},
	{"subject": "geology","calID" : "la3qpnr9qd2k2s1mm3ee7cgo64@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#geology"></use></svg>'},
	{"subject": "management","calID" : "9j58gjd005fuv18gr5ajra22lo@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#management"></use></svg>'},
	{"subject": "marketing","calID" : "ionrasab4mm3urh1gtnh4ghjbg@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#marketing"></use></svg>'},
	{"subject": "math","calID" : "na17veqhhbaafs4k6oon04j0rg@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#math"></use></svg>'},
	{"subject": "physics","calID" : "u78vufl4cevon2s0uji17vrk4g@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#physics"></use></svg>'},
	{"subject": "physiology","calID" : "tmoolu97bao9neupin429jm274@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#anatomy"></use></svg>'},
	{"subject": "psychology","calID" : "j1jc3ai30u6uf3p4ai9sl43800@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#psychology"></use></svg>'},
	{"subject": "sociology","calID" : "ef1j8eeh1ilrt89kvn4542oo48@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#sociology"></use></svg>'},
	{"subject": "statistics","calID" : "rkrn8ktgvuln4n0s7tmn2rnjs0@group.calendar.google.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#statistics"></use></svg>'},
	{"subject": "organic chemistry","calID" : "tutoring543@gmail.com","sessions":[], "icon" : '<svg><use xlink:href="icons/icon_set.svg#organic-chemistry"></use></svg>'},
];
