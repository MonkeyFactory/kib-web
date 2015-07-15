'use strict';

angular.module('kibAdmin').controller('TournamentPlayersCtrl', function($scope, tournamentInstance){
	tournamentInstance.ready.then(function(){
		$scope.tournament = tournamentInstance;
	});
	
	$scope.dropout = function(player){
		player.active = false;	
	};
});

angular.module('kibAdmin').filter('sourceName', function(){
	return function(value){
		switch(value){
			case 1:
				return 'KiB Forum';
			case 2:
				return 'Svenska 40k';
			case 3:
				return 'Direct input';
			default:
				return 'Crap! I don\'t know';
		}
	};
});