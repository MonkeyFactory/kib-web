'use strict';

angular.module('kibAdmin').controller('TournamentPlayersCtrl', function($scope, tournamentInstance, $http){
    $scope.directInput = {
        name: '',
        affiliation: '',
        compensationPoints: ''
    };
    
	$scope.s40kuser = '';
	$scope.forumUser = '';
	
	tournamentInstance.ready.then(function(){
		$scope.tournament = tournamentInstance;
	});
	
	$scope.dropout = function(player){
		player.active = false;	
	};
    
	$scope.remove = function(player){
		//Remove player
	};
	
    $scope.lookupUser = function(user){
		return $http.get('http://konfliktspeliborlange.se/modend/api/authinfo/completeusername/' + user
		).then(function(response){
		  return response.data;
		});
	};
    
    $scope.addFromForum = function(){
        //Value in $scope.forumUser  
        $scope.tournament.addPlayer($scope.forumUser, 'KIB', 1,  $scope.forumUser);
    };
    
    $scope.addFromSvenska40k = function(){
        //Value in $scope.s40kuser
    };
    
    $scope.addFromDirectInput = function(){
        //Value in $scope.directInputPlayerName  
        $scope.tournament.addPlayer($scope.directInput.name, $scope.directInput.affiliation, $scope.directInput.compensationPoints, 3,  null).then(function(){
            $scope.directInput = {};
        });
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