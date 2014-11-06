var BaseURL = "http://localhost/modend/api";

kibApp.factory('kibservice', function($resource){
	var Page = $resource(BaseURL + "/page/:pageName");
	var Event = $resource(BaseURL + "/events/:eventId");
	
	return {
		GetPage: function(pageName){
			return Page.get({pageName: pageName});
		},
		
		GetPages: function(){
			return Page.query();
		},
		
		GetEvents: function(callback) {
			var events = Event.query(function(){
				events.forEach(function(e, i){
					events[i].title = e.Title;
					events[i].start = e.StartDate;
					events[i].end = e.EndDate;
					events[i].allDay = false;
					
					events[i].Duration = moment(e.EndDate).diff(e.StartDate, 'hours');
				});
				
				callback(events);
			});
		}
	};
});