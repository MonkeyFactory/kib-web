kibApp.controller('LeagueDetailsPageController', function($scope, $window){
	$scope.minimized = false;
	$scope.tab = "leaderboard";
	
	 angular.element($window).bind("scroll", function(e) {
       $scope.minimized = true;
	   $scope.$apply();
	});
});