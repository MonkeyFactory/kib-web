'use strict';

angular.module('kibAdmin').controller('TournamentScoreboardCtrl', function($scope, tournamentInstance){
	tournamentInstance.ready.then(function(){
		$scope.tournament = tournamentInstance;
        
        var N = $scope.tournament.rounds && $scope.tournament.rounds.length > 0 ? $scope.tournament.rounds.length : 0;
        $scope.matchScoresCount = Array.apply(null, {length: N}).map(Number.call, Number);
	});
});