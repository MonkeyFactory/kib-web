'use strict';

angular.module('kibApp').controller('TournamentRoundController', function($scope, $stateParams, $modal, tournamentInstance){
    tournamentInstance.init($stateParams.tournamentId).then(function(){
        if(tournamentInstance.rounds && tournamentInstance.rounds.length > 0){
		    $scope.round = tournamentInstance.rounds[tournamentInstance.rounds.length - 1];
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
