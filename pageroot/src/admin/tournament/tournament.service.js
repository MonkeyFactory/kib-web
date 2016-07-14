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
		
            var tournamentPromise = tournamentService.get(tournamentId).$promise.then(function(tournament){
               self.name = tournament.name;
               self.date = tournament.date; 
               self.id = tournament.id;
            });
            
            var matchupPromise = $q.defer().promise;   
            var playerPromise = tournamentService.getPlayers(tournamentId).$promise.then(function(players){
                self.players = players;
                
                matchupPromise = getRounds(self);
            });
            
            var scorePromise = tournamentService.getScoreboard(tournamentId).$promise.then(function(scores){
               self.scores = scores; 
            });
           
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
	
    var getRounds = function(self){
        return tournamentService.getMatchups(self.id).$promise.then(function(matchups){
            self.rounds = []
            
            matchups.sort(function(a,b){return a.roundNumber - b.roundNumber;});
            matchups.forEach(function(round){
            self.rounds.push({
                id: round.roundId,
                name: 'Round ' + round.roundNumber,
                roundNumber: round.roundNumber,
                public: round.public,
                matchups: round.matchups.map(function(matchup){
                    return {
                        id: matchup.id,
                        table: 'Table ' + matchup.tableNumber,
                        tableNumber: matchup.tableNumber,
                        player1: self.players.find(function(p){ return p.id == matchup.player1Id }),
                        player2: self.players.find(function(p){ return p.id == matchup.player2Id }),
                        player1Score: matchup.player1Score,
                        player2Score: matchup.player2Score  
                    };
                })
                }); 
            });
        });
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
        dropoutRemovePlayer: function(playerId){
            var promise = tournamentService.dropoutRemovePlayer(this.id, playerId).$promise;
            var localSelf = this;
            
            promise.then(function(){
                tournamentService.getPlayers(localSelf.id).$promise.then(function(players){
                    localSelf.players = players;
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
        },
        generateNextRound: function(){
            var defer = $q.defer();
            
            var localSelf = this;
            tournamentService.generateNextRound(this.id).then(function(rawRound){
               getRounds(localSelf).then(function(){
                  defer.resolve(localSelf.rounds);
                  readyDefer.resolve();
               });
            }, function(){
                defer.reject();
            });
            
            return defer.promise;   
        }
	};
});

angular.module('kibAdmin').factory('tournamentService', function($resource, constants, $http){
	var Tournament = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId');
    var Player = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/player/:playerId');
    var Matchup = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/matchups');
    var Score = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/score/:matchupId');
    var RoundPublic = $resource(constants.tournamentApiPath + '/api/tournament/:tournamentId/round/:roundId/public');
    
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
        
        dropoutRemovePlayer: function(tournamentId, playerId){
            return Player.delete({tournamentId: tournamentId, playerId: playerId});  
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
            var matchup = new Matchup();
            return matchup.$save({tournamentId: tournamentId});
        },
        
        makeRoundPublic: function(tournamentId, roundId){
            var roundPublic = new RoundPublic();
            return roundPublic.$save({tournamentId: tournamentId, roundId: roundId});   
        }
    };
});
