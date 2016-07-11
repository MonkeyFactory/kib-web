'use strict';

angular.module('kibApp').controller('TournamentRoundController', function($scope, $stateParams, tournamentInstance){
    tournamentInstance.init($stateParams.tournamentId).then(function(){
        if(tournamentInstance.rounds && tournamentInstance.rounds.length > 0){
		    $scope.round = tournamentInstance.rounds[tournamentInstance.rounds.length - 1];
        }
	}, function(){
		alert('Load error!')
	});
});
