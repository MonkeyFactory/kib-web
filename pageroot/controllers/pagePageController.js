kibApp.controller('PagePageController', function($scope, $routeParams, kibservice){
	$scope.page = kibservice.GetPage($routeParams.pageName);
});