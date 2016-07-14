'use strict';

angular.module('kibApp').controller('TournamentRoundController', function($scope, $stateParams, $modal, tournamentInstance, kibservice){
    $scope.infoPage = kibservice.GetPage("tournament-" + $stateParams.tournamentId);
    
    tournamentInstance.init($stateParams.tournamentId).then(function(){
        if(tournamentInstance.rounds && tournamentInstance.rounds.length > 0){
		    $scope.round = tournamentInstance.rounds[tournamentInstance.rounds.length - 1];
            
            var pseudoMatch = $scope.round.matchups.find(function(m){ return !m.player2; });
            if(pseudoMatch){
                var index = $scope.round.matchups.indexOf(pseudoMatch);
                $scope.round.matchups.splice(index, 1);
            }
            
            $scope.scores = tournamentInstance.scores;
        }
	}, function(error){
		alert('Load error!');
	});
    
    $scope.openReportModal = function(matchup){
        $modal.open({
		  templateUrl: 'app/tournament/reportscore.modal.template.html',
		  controller: 'ReportScoreModalController',
		  size: 'sm',
		  resolve: {
			tournament: function () {
			  return tournamentInstance;
			},
            matchup: function () {
			  return matchup;
			}
		  }
    	}).result.then(function(scores){
            matchup.player1Score = scores.player1Score;
            matchup.player2Score = scores.player2Score;
        });	
    };
});
