'use strict';

angular.module('kibAdmin').controller('AdminTournament', function($stateParams, $scope, tournamentInstance){
	tournamentInstance.init($stateParams.tournamentId).then(function(){
		$scope.rounds = tournamentInstance.rounds;
	}, function(){
		//Handle load error
	});
	
	$scope.saveScore = function(matchup){
        
    }
    
	$scope.createNewMatch = function(){
        if(!$scope.allMatchesReported())
            return;
        
		$scope.rounds.push({name: 'Apa'});
	}
	
	$scope.allMatchesReported = function(){
        if(!$scope.rounds || $scope.rounds.length == 0)
            return true;
        
        var isReported = true;
        var currentRound = $scope.rounds[$scope.rounds.length - 1];
        currentRound.matchups.forEach(function(matchup){
            if(!isReported)
                return;
            
           if(matchup.player1Score == undefined || matchup.player2Score == undefined){
               isReported = false;
           } 
        });
        
		return isReported;	
	};
});