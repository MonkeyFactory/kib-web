kibApp.controller('LeagueListPageController', function($scope, kibservice, $location){
	$scope.leagues = kibservice.GetLeagues();
	
	$scope.onSelectedLeague = function(league){
		$location.url("#/leagues/" + league.leagueId);
	}
});
