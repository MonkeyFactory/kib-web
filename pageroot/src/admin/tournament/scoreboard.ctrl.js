'use strict';

angular.module('kibAdmin').controller('TournamentScoreboardCtrl', function($scope, tournamentInstance){
	tournamentInstance.ready.then(function(){
		$scope.tournament = tournamentInstance;
        
        var N = $scope.tournament.scores && $scope.tournament.scores.length > 0 ? $scope.tournament.scores[0].matchScores.length : 0;
        $scope.matchScoresCount = Array.apply(null, {length: N}).map(Number.call, Number);
	});
});