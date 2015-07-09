'use strict';

angular.module('kibAdmin').controller('AdminPageController', function($scope, $stateParams, $location, kibservice, adminservice){	
	// Editor options.
	  $scope.options = {
		language: 'en',
		allowedContent: true,
		entities: false
	  };

	
	var newPage;
	if($stateParams.pageName){
		$scope.page = kibservice.GetPage($stateParams.pageName, true);
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
			adminservice.SavePage($stateParams.pageName, $scope.page);
		}
		
		$location.path('/admin/listpages');
	};
});