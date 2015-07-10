'use strict';

angular.module('kibApp').controller('LeagueListPageController', function($scope, kibservice, $location){
	$scope.leagues = kibservice.GetLeagues();
	
	$scope.allLeaguesIsInactive = function(){
		for(var i = 0; i < $scope.leagues.length; i++){
			var league = $scope.leagues[i];
			if(!league.EndDate || moment(league.EndDate) < moment()){
				return false;	
			}
		}
		
		return true;
	}
	
	$scope.onSelectedLeague = function(league){
		$location.path('/leagues/' + league.leagueId);
	};
});
