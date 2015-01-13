kibApp.controller('LeagueDetailsPageController', function($scope, $window){
	$scope.minimized = false;
	$scope.tab = "leaderboard";
	
	angular.element($window).bind("scroll", function(e) {
       $scope.minimized = true;
	   $scope.$apply();
	});
	
	$scope.leaderboard = [{Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},];
});