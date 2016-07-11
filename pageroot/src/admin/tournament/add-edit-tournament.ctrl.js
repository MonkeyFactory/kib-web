'use strict';

/* global confirm */

angular.module('kibAdmin').controller('AddEditTournamentCtrl', function($modalInstance, $scope, tournament, tournamentService){
    $scope.tournament = tournament;
    
    $scope.ok = function(){
        tournamentService.add($scope.tournament.name, $scope.tournament.date).then(function(){
           $modalInstance.close(); 
        }, function(error){
           alert("Failed to save: " + error); 
        });
    }
    
    $scope.cancel = function(){
        $modalInstance.dismiss();
    }
});