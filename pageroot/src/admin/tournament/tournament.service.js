'use strict';

angular.module('kibAdmin').factory('tournamentInstance', function($q, tournamentService){
	var players = [];
	var rounds = [];
	var name = '';
	var date = '';
	var status = 1;
    var id = -1;
	
	var readyDefer = $q.defer();
	var tournamentId;

	var init = function(tournamentId){
		if(tournamentId){
            var self = this;
            
			//fetch data
			// this.players = [
			// 	{
			// 		name: 'Nojan',
			// 		active: true,
			// 		source: 3,
			// 		originalObject: {}
			// 	},
			// 	{
			// 		name: 'Robin',
			// 		active: true,
			// 		source: 3,
			// 		originalObject: {}
			// 	},
			// 	{
			// 		name: 'Kim',
			// 		active: true,
			// 		source: 3,
			// 		originalObject: {}
			// 	},
			// 	{
			// 		name: 'Johan',
			// 		active: true,
			// 		source: 3,
			// 		originalObject: {}
			// 	}
			// ];
		
            var tournamentPromise = tournamentService.get(tournamentId).$promise.then(function(tournament){
               self.name = tournament.name;
               self.date = tournament.date; 
               self.id = tournament.id;
            });
            
            var matchupPromise = $q.defer().promise;   
            var playerPromise = tournamentService.getPlayers(tournamentId).$promise.then(function(players){
                self.players = players;
                
                matchupPromise = tournamentService.getMatchups(tournamentId).$promise.then(function(matchups){
                     self.rounds = []
                     
                     matchups.sort(function(a,b){return a.roundNumber - b.roundNumber;});
                     matchups.forEach(function(round){
                        self.rounds.push({
                           name: 'Round ' + round.roundNumber,
                           matchups: round.matchups.map(function(matchup){
                               return {
                                    id: matchup.id,
                                    table: 'Table ' + matchup.tableNumber,
                                    player1: self.players.find(function(p){ return p.id == matchup.player1Id }),
                                    player2: self.players.find(function(p){ return p.id == matchup.player2Id })  
                               };
                           })
                        }); 
                     });
                });
            });
            
			// this.rounds = [
			// 	{
			// 		name: 'Round 1',
			// 		matchups: [
			// 			{
			// 				table: 'Table 1',
			// 				player1: this.players[0],
			// 				player2:  this.players[1]
			// 			},
			// 			{
			// 				table: 'Table 2',
			// 				player1:  this.players[2],
			// 				player2:  this.players[3]
			// 			}
			// 		]
			// 	}
			// ];
			
			tournamentPromise.then(function(){
                playerPromise.then(function(){
                    matchupPromise.then(function(){
                       readyDefer.resolve(); 
                    });
                });
            });
		}else{
			//newly created, not saved in database. Nothing to init
			readyDefer.resolve();
		}
		
		return readyDefer.promise;
	};
	
	return {
        id: id,
		status: status,
		name: name,
		date: date,
		players: players,
		rounds: rounds,
		init: init,
		ready: readyDefer.promise,
        addPlayer: function(name, source, originalObject){
            this.players.push(
                {
                    name: name,
                    active: true,
                    source: source,
                    originalObject: originalObject
                });   
        }
	};
});

angular.module('kibAdmin').factory('tournamentService', function($resource, constants, $http){
	var Tournament = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId')
    var Player = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/player');
    var Matchup = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/matchups');
    
	return {
        list: function(){
            return Tournament.query();
        },
        
        get: function(tournamentId){
            return Tournament.get({tournamentId: tournamentId});  
        },
        
        getPlayers: function(tournamentId){
            return Player.query({tournamentId: tournamentId});
        },
        
        getMatchups: function(tournamentId){
            return Matchup.query({tournamentId: tournamentId});
        },
        
        reportScore: function(tournamentId, matchupId, player1Score, player2Score){
            return $http.post(constants.tournamentApiPath + '/api/tournament/' + tournamentId + '/score/' + matchupId, 
                              {
                                  player1Score: player1Score,
                                  player2Score: player2Score
                              });
        }
    };
});
