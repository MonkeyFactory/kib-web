
kibAdmin.controller('ListPageController', function($scope, $location, kibservice, adminservice){
	$scope.pages = kibservice.GetPages();
	
	$scope.doEdit = function(page){		
		$location.path("/admin/adminpage/" + page.pageName);
	}
	
	$scope.doDelete = function(page){
		if(confirm("Really remove "+page.pageName+" from the database?")){
			var i = $scope.pages.indexOf(page);
			if(i != -1) {
				adminservice.DeletePage($scope.pages[i].pageName);
			}
			
			$scope.pages = kibservice.GetPages();
			$scope.$apply();
		}
	}
});