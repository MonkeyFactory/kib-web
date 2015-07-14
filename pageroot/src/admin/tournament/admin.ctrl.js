'use strict';

angular.module('kibAdmin').controller('AdminTournament', function($stateParams, $scope){
	
	$scope.rounds = [
		{
			name: 'Round 1',
			matchups: [
				{
					table: 'Table 1',
					player1: 'Nojan',
					player2: 'Robin'
				},
				{
					table: 'Table 2',
					player1: 'Johan',
					player2: 'Kim'
				}
			]
		}
	];
	
	$scope.createNewMatch = function(){
		$scope.rounds.push({name: 'Apa'});
	}
	
	$scope.allMatchesReported = function(){
		return true;	
	};
});