'use strict';

angular.module('kibAdmin').controller('TournamentScoreboardCtrl', function($scope, tournamentInstance){
	tournamentInstance.ready.then(function(){
		$scope.tournament = tournamentInstance;
        
        var numMatches = $scope.tournament.rounds && $scope.tournament.rounds.length > 0 ? $scope.tournament.rounds.length : 0;
        $scope.matchScoresCount = Array.apply(null, {length: numMatches}).map(Number.call, Number);
        
        $scope.tournament.scores.forEach(function(score){
            if(score.matchScores && score.matchScores.length != numMatches){
                while(score.matchScores.length < numMatches){
                    score.matchScores.push({
                       score: 0 
                    });
                }
            } 
        });
	});
});