'use strict';

/* global confirm */

angular.module('kibAdmin').controller('ListEventController', function($scope, $location, kibservice, adminservice){
	kibservice.GetEvents(function(events){
		$scope.events = events;
	});
	
	$scope.doEdit = function(event){		
		$location.path('/admin/adminevent/' + event.eventId);
	};
	
	$scope.doDelete = function(event){
		if(confirm('Really remove '+event.Title+' from the database?')){
			var i = $scope.events.indexOf(event);
			if(i !== -1) {
				adminservice.DeleteEvent($scope.events[i].eventId);
			}
			
			kibservice.GetEvents(function(events){
				$scope.events = events;
				$scope.$apply();
			});			
		}
	};
});