var BaseURL = "http://localhost/modend/api";

kibAdmin.factory('adminservice', function($resource){
	var Page = $resource(BaseURL + "/page/:pageName");
	var Event = $resource(BaseURL + "/events/:eventId");
	
	return {
		//PAGES
	
		NewPage: function(pageArg){
			page = new Page(pageArg);
			return page.$save();
		},
		
		SavePage: function(pageName, page){
			return page.$save({pageName: pageName});
		},
		
		DeletePage: function(pageName){
			return Page.delete({pageName: pageName});
		},
		
		//EVENTS
		
		NewEvent: function(eventArg){
			event = new Event(eventArg);
			return event.$save();
		},
		
		SaveEvent: function(eventId, eventArg){
			return eventArg.$save({eventId: eventId});
		},
		
		DeleteEvent: function(eventId) {
			return Event.delete({eventId: eventId});
		},
		
		//AUTH
		
		GetAuthInfo: function(callback) {
			$resource(BaseURL + "/authinfo/").get({}, function(value, headers){
				callback(value);
			});
		}
	};
});