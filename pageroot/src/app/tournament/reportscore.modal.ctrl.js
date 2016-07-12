'use strict';

/* global confirm */

angular.module('kibApp').controller('ReportScoreModalController', function($modalInstance, $scope, tournament, tournamentService, matchup){
    $scope.tournament = tournament;
    $scope.matchup = matchup;
    
    $scope.scores = {
        player1Score: matchup.player1Score,
        player2Score: matchup.player2Score  
    };
    
    $scope.report = function(){
       tournamentService.reportScore($scope.tournament.id, $scope.matchup.id, $scope.scores.player1Score, $scope.scores.player2Score).then(function(){
           $modalInstance.close($scope.scores);
       }, function(error){
           alert('Failed to report score');
           console.error(error);
       });
    }
});