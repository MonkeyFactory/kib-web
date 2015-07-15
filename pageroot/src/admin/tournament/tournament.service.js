'use strict';

angular.module('kibAdmin').factory('tournamentInstance', function($q){
	var players = [];
	var rounds = [];
	var name = '';
	var date = '';
	var status = 1;
	
	var readyDefer = $q.defer();
	var tournamentId;

	var init = function(tournamentId){
		if(tournamentId){
			//fetch data
			this.players = [
				{
					name: 'Nojan',
					active: true,
					source: 3,
					originalObject: {}
				},
				{
					name: 'Robin',
					active: true,
					source: 3,
					originalObject: {}
				},
				{
					name: 'Kim',
					active: true,
					source: 3,
					originalObject: {}
				},
				{
					name: 'Johan',
					active: true,
					source: 3,
					originalObject: {}
				}
			];
			
			this.rounds = [
				{
					name: 'Round 1',
					matchups: [
						{
							table: 'Table 1',
							player1: this.players[0],
							player2:  this.players[1]
						},
						{
							table: 'Table 2',
							player1:  this.players[2],
							player2:  this.players[3]
						}
					]
				}
			];
			
			this.name = 'Test tournament';
			this.date = 'YYYY-MM-DD HH:mm';
			
			readyDefer.resolve();
		}else{
			//newly created, not saved in database. Nothing to init
			readyDefer.resolve();
		}
		
		return readyDefer.promise;
	};
	
	return {
		status: status,
		name: name,
		date: date,
		players: players,
		rounds: rounds,
		init: init,
		ready: readyDefer.promise
	};
});

angular.module('kibAdmin').factory('tournamentService', function(){
	
	return {};
});
