kibAdmin.controller('AdminEventController', function($scope, $routeParams, $location, kibservice, adminservice){		
	if($routeParams.pageName){
		//$scope.page = kibservice.GetPage($routeParams.pageName);
		var newEvent = false;
		$scope.buttonText = "Save Changes";
	}else{
		//$scope.page = {};
		var newEvent = true;
		$scope.buttonText = "Add Event";
	}
	
	$scope.saveEvent = function(){
		if(newEvent){
			//adminservice.NewPage($scope.page);
		}else{
			//adminservice.SavePage($routeParams.pageName, $scope.page);
		}
		
		$location.path("/admin/listevents");
	}
});