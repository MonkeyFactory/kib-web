'use strict';

angular.module('kibAdmin').factory('adminservice', function($resource, $http, constants){
	var Page = $resource(constants.apiPath + '/page/:pageName');
	var Event = $resource(constants.apiPath + '/events/:eventId');
	var League = $resource(constants.apiPath + '/league/:leagueId');
	var Matches = $resource(constants.apiPath + '/league/matches/:matchId',null,null,{ stripTrailingSlashes: false });
	
	return {
		//PAGES
	
		NewPage: function(pageArg){
			var page = new Page(pageArg);
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
			var event = new Event(eventArg);
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
			$resource(constants.apiPath + '/authinfo/').get({}, function(value){
				callback(value);
			});
		},
		
		//LEAGUE
		
		ReportMatch: function(leagueId, matchObj){
			return $http.post(constants.apiPath + '/league/' + leagueId + '/reportmatch', matchObj);
		},
		
		GetNewLeague: function(){
			return new League();
		},
		
		//MATCHES
		
		GetMatches: function(){
			return Matches.query();
		}
	};
});