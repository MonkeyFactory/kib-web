kibAdmin.controller('AdminPageController', function($scope, $routeParams, kibservice){		
	if($routeParams.pageName){
		$scope.page = kibservice.GetPage($routeParams.pageName);
		var newPage = false;
		$scope.buttonText = "Save Changes";
	}else{
		$scope.page = {};
		var newPage = true;
		$scope.buttonText = "Add Page";
	}
	
	$scope.savePage = function(){
		if(newPage){
			kibservice.NewPage()
		}else{
			
		}
	}
});