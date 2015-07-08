'use strict';

angular.module('kibApp').controller('LeagueListPageController', function($scope, kibservice, $location){
	$scope.leagues = kibservice.GetLeagues();
	
	$scope.onSelectedLeague = function(league){
		$location.path('/leagues/' + league.leagueId);
	};
});
