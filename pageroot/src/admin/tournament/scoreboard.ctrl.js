'use strict';

angular.module('kibAdmin').controller('TournamentScoreboardCtrl', function($scope, tournamentInstance){
	tournamentInstance.ready.then(function(){
		$scope.tournament = tournamentInstance;
	});
});