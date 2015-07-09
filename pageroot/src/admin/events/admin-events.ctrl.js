'use strict';

angular.module('kibAdmin').controller('AdminEventController', function($scope, $stateParams, $location, kibservice, adminservice){		
	var newEvent;
	if($stateParams.eventId){
		$scope.event = kibservice.GetEvent($stateParams.eventId);
		newEvent = false;
		$scope.buttonText = 'Save Changes';
	}else{
		$scope.event = {};
		newEvent = true;
		$scope.buttonText = 'Add Event';
	}
	
	$scope.saveEvent = function(){
		if(newEvent){
			adminservice.NewEvent($scope.event);
		}else{
			adminservice.SaveEvent($stateParams.eventId, $scope.event);
		}
		
		$location.path('/admin/listevents');
	};
});