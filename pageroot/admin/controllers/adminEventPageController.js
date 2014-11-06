kibAdmin.controller('AdminEventController', function($scope, $routeParams, $location, kibservice, adminservice){		
	if($routeParams.eventId){
		$scope.event = kibservice.GetEvent($routeParams.eventId);
		var newEvent = false;
		$scope.buttonText = "Save Changes";
	}else{
		$scope.event = {};
		var newEvent = true;
		$scope.buttonText = "Add Event";
	}
	
	$scope.saveEvent = function(){
		if(newEvent){
			adminservice.NewEvent($scope.event);
		}else{
			adminservice.SaveEvent($routeParams.eventId, $scope.event);
		}
		
		$location.path("/admin/listevents");
	}
});