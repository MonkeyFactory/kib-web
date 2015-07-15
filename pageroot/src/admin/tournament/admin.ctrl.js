'use strict';

angular.module('kibAdmin').controller('AdminTournament', function($stateParams, $scope, tournamentInstance){
	tournamentInstance.init($stateParams.tournamentId).then(function(){
		$scope.rounds = tournamentInstance.rounds;
	}, function(){
		//Handle load error
	});
	
	
	$scope.createNewMatch = function(){
		$scope.rounds.push({name: 'Apa'});
	}
	
	$scope.allMatchesReported = function(){
		return true;	
	};
});