'use strict';

/* global alert, confirm */
/*jshint -W083 */

angular.module('kibAdmin').controller('AdminMatchesController', function($scope, $location, $timeout, kibservice, adminservice){
	//Get matches and set state variables
	$scope.matches = adminservice.GetMatches();
	$scope.matches.$promise.then(function(){
		for(var i=0;i < $scope.matches.length;i++){
			$scope.matches[i].edit = false;
			$scope.matches[i].isNew = false;
		}
	});

	var onError = function(errMsg){
		alert('Error ocurred when communicating with server!\n' + errMsg);
	};
	
	var checkDataState = function(){
		for(var i=0;i < $scope.matches.length;i++){
			if($scope.matches[i].edit){
				if($scope.matches[i].isNew){
					$scope.matches[i].$save();
					$scope.matches[i].$promise.then(function(){
						$scope.matches[i].isNew = false;
						$scope.matches[i].edit = false;
					}, onError);
					
				}else{
					$scope.matches[i].$save({matchId: $scope.matches[i].matchId});
					$scope.matches[i].$promise.then(function(){
						$scope.matches[i].edit = false;
					}, onError);
				}
			}
		}
	};
	
	$scope.doAdd = function(){
		checkDataState();
	
		var newmatch = adminservice.GetNewmatch();
		newmatch.isNew = true;
		newmatch.edit = true;
		
		$scope.matches.push(newmatch);
	};
	
	$scope.doEdit = function(match){
		checkDataState();
	
		match.edit = true;
	};
	
	$scope.saveEdit = function(){
		checkDataState();
	};
	
	$scope.doDelete = function(match) {
		checkDataState();
		
		if(confirm('Really delete match? :(')){
			match.$delete({matchId: match.matchId});
			match.$promise.then(function(){
				var index = $scope.matches.indexOf(match);
				if (index > -1) {
					$scope.matches.splice(index, 1);
				}
				
				$timeout(function(){
					$scope.apply();
				});
			}, onError);
		}
	};
});