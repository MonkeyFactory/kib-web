'use strict';

/* global alert, confirm */
/*jshint -W083 */

angular.module('kibAdmin').controller('AdminLeagueController', function($scope, $location, $timeout, kibservice, adminservice){
	//Get leagues and set state variables
	$scope.leagues = kibservice.GetLeagues();
	$scope.leagues.$promise.then(function(){
		for(var i=0;i < $scope.leagues.length;i++){
			$scope.leagues[i].edit = false;
			$scope.leagues[i].isNew = false;
		}
	});

	var onError = function(errMsg){
		alert('Error ocurred when communicating with server!\n' + errMsg);
	};
	
	var checkDataState = function(){
		for(var i=0;i < $scope.leagues.length;i++){
			if($scope.leagues[i].edit){
				if($scope.leagues[i].isNew){
					$scope.leagues[i].$save();
					$scope.leagues[i].$promise.then(function(){
						$scope.leagues[i].isNew = false;
						$scope.leagues[i].edit = false;
					}, onError);
					
				}else{
					$scope.leagues[i].$save({leagueId: $scope.leagues[i].leagueId});
					$scope.leagues[i].$promise.then(function(){
						$scope.leagues[i].edit = false;
					}, onError);
				}
			}
		}
	};
	
	$scope.doAdd = function(){
		checkDataState();
	
		var newLeague = adminservice.GetNewLeague();
		newLeague.isNew = true;
		newLeague.edit = true;
		
		$scope.leagues.push(newLeague);
	};
	
	$scope.doEdit = function(league){
		checkDataState();
	
		league.edit = true;
	};
	
	$scope.saveEdit = function(){
		checkDataState();
	};
	
	$scope.doDelete = function(league) {
		checkDataState();
		
		if(confirm('Really delete league? :(')){
			league.$delete({leagueId: league.leagueId});
			league.$promise.then(function(){
				var index = $scope.leagues.indexOf(league);
				if (index > -1) {
					$scope.leagues.splice(index, 1);
				}
				
				$timeout(function(){
					$scope.apply();
				});
			}, onError);
		}
	};
});