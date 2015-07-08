'use strict';

angular.module('kibApp').factory('kibservice', function($resource, constants){
	var Page = $resource(constants.apiPath + '/page/:pageName?:query', {query: ''});
	var Event = $resource(constants.apiPath + '/events/:eventId');
	var League = $resource(constants.apiPath + '/league/:leagueId');
	
	return {
		GetPage: function(pageName, noLinking){
			if(noLinking){	
				return Page.get({pageName: pageName, query: 'nolinking'});
			}else{
				return Page.get({pageName: pageName});
			}
		},
		
		GetPages: function(){
			return Page.query();
		},
		
		GetEvents: function(callback) {
			var events = Event.query(function(){
				events.forEach(function(e, i){
					events[i].title = e.Title;
					events[i].start = e.StartDate;
					
					if(e.AllDayEvent === '1'){
						events[i].allDay = true;
						events[i].Duration = -1;
					}else{
						events[i].end = e.EndDate;
						events[i].Duration = moment(e.EndDate).diff(e.StartDate, 'hours');
					}
				});
				
				callback(events);
			});
		},
		
		GetEvent: function(eventId){
			return Event.get({eventId: eventId});
		},
		
		GetLeagues: function(){
			return League.query();
		},
		
		GetLeague: function(leagueId){
			return League.get({leagueId: leagueId});
		},
		
		GetLeaderboard: function(leagueId) {
			return $resource(constants.apiPath + '/league/:leagueId/leaderboard').query({leagueId: leagueId});
		},
		
		GetScoreHistory: function(leagueId) {
			return $resource(constants.apiPath + '/league/:leagueId/scorehistory').query({leagueId: leagueId});			
		},
		
		GetCurrentChallenge: function(leagueId) {
			return $resource(constants.apiPath + '/league/:leagueId/currentchallenge').get({leagueId: leagueId});	
		}
	};
});