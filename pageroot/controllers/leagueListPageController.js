kibApp.controller('LeagueDetailsPageController', function($scope, kibservice){
	$scope.leagues = kibservice.GetLeagues();
});