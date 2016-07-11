'use strict';

angular.module('kibAdmin').factory('tournamentInstance', function($q, tournamentService){
	var players = [];
	var rounds = [];
    var scores = [];
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
                                    player2: self.players.find(function(p){ return p.id == matchup.player2Id }),
                                    player1Score: matchup.player1Score,
                                    player2Score: matchup.player1Score  
                               };
                           })
                        }); 
                     });
                });
            });
            
            var scorePromise = tournamentService.getScoreboard(tournamentId).$promise.then(function(scores){
               self.scores = scores; 
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
                        scorePromise.then(function(){
                            readyDefer.resolve();
                        });
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
        addPlayer: function(name, affiliation, compensationPoints, source, originalObject){
            var promise = tournamentService.addPlayer(this.id, name, affiliation, compensationPoints);
            var localSelf = this;

            promise.then(function(){
                localSelf.players.push(
                {
                    name: name,
                    affiliation: affiliation,
                    active: true,
                    source: source,
                    originalObject: originalObject,
                    compensationPoints: compensationPoints
                });   
            });
            
            return promise;
        },
        reportScore: function(matchupId, player1Score, player2Score){
            var promise = tournamentService.reportScore(this.id, matchupId, player1Score, player2Score);
            var localSelf = this;
            
            promise.then(function(){
                tournamentService.getScoreboard(localSelf.id).$promise.then(function(scores){
                   localSelf.scores = scores; 
                });
            });
            
            return promise;   
        }
	};
});

angular.module('kibAdmin').factory('tournamentService', function($resource, constants, $http){
	var Tournament = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId');
    var Player = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/player');
    var Matchup = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/matchups');
    var Score = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/score/:matchupId');
    
	return {  
        list: function(){
            return Tournament.query();
        },
        
        get: function(tournamentId){
            return Tournament.get({tournamentId: tournamentId});  
        },
        
        add: function(name, date){
            var tournament = new Tournament();
            tournament.name = name;
            tournament.date = date;
            
            return tournament.$save();  
        },
        
        getPlayers: function(tournamentId){
            return Player.query({tournamentId: tournamentId});
        },
        
        addPlayer: function(tournamentId, name, affiliation, compensationPoints){
            var player = new Player({name: name, affiliation: affiliation, compensationPoints: compensationPoints});
            return player.$save({tournamentId: tournamentId});
        },
        
        getMatchups: function(tournamentId){
            return Matchup.query({tournamentId: tournamentId});
        },
        
        getScoreboard: function(tournamentId){
            return Score.query({tournamentId: tournamentId})
        },
        
        reportScore: function(tournamentId, matchupId, player1Score, player2Score){
            var score = new Score({
                                  player1Score: player1Score,
                                  player2Score: player2Score
                              });
            return score.$save({tournamentId: tournamentId, matchupId: matchupId});
        },
        
        generateNextRound: function(tournamentId){
            return $http.post(constants.tournamentApiPath + '/api/tournament/' + tournamentId + '/matchups', {});
        }
    };
});
