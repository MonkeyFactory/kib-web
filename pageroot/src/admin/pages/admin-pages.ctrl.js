'use strict';

angular.module('kibAdmin').controller('AdminPageController', function($scope, $routeParams, $location, kibservice, adminservice){	
	// Editor options.
	  $scope.options = {
		language: 'en',
		allowedContent: true,
		entities: false
	  };

	
	var newPage;
	if($routeParams.pageName){
		$scope.page = kibservice.GetPage($routeParams.pageName, true);
		newPage = false;
		$scope.buttonText = 'Save Changes';
	}else{
		$scope.page = {};
		newPage = true;
		$scope.buttonText = 'Add Page';
	}
	
	$scope.savePage = function(){
		if(newPage){
			adminservice.NewPage($scope.page);
		}else{
			adminservice.SavePage($routeParams.pageName, $scope.page);
		}
		
		$location.path('/admin/listpages');
	};
});