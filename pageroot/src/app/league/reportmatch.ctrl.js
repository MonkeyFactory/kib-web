'use strict';

angular.module('kibApp').controller('LeagueReportMatchController', function($scope, $stateParams, $window, $timeout, $location, kibservice, adminservice, userservice){
	adminservice.GetAuthInfo(function(auth){
		if(auth.authlevel === 0){
			//not logged in
			//$window.location.href = "/forum/ucp.php?mode=login&redirect=%23%2Fleagues%2F" + $stateParams.leagueId + "%2Freportmatch";
			$scope.auth = {authlevel: 3, userId: 2};
		}else{
			$scope.auth = auth;
		}
	});
	
	$scope.leagueId = $stateParams.leagueId;
	$scope.match = {};
	
	$scope.challenge = kibservice.GetCurrentChallenge($scope.leagueId);
	
	$scope.lookupUser = userservice.lookup;
	
	$scope.reportMatch = function(){
		if(angular.isUndefined($scope.selectedPlayer2)){
			//form not filled in properly
			return;
		}
		
		if(false && $scope.auth.authlevel > 1){
			if(angular.isUndefined($scope.selectedPlayer1)){
				//form not filled in properly
				return;
			}
			
			$scope.match.Player1 = $scope.selectedPlayer1.originalObject.user_id; 
		}else{
			$scope.match.Player1 = $scope.auth.userId;
		}
		
		//Extract selected opponent user_id and add it to the match object
		$scope.match.Player2 = $scope.selectedPlayer2.originalObject.user_id;
		
		$scope.saving = 1;
		adminservice.ReportMatch($stateParams.leagueId, $scope.match)
		.success(function(){
			$scope.saving = 2;
			
			$timeout(function(){
				$location.path('/leagues/' + $stateParams.leagueId);
			}, 2000);
		})
		.error(function(data){
			var errorMsg = 'Ett fel uppstod när matchen skulle sparas! Försök igen senare!';
			if(angular.isDefined(data.message)){
				errorMsg += 'n' + data.message;
			}
		
			$window.alert(errorMsg);
			delete $scope.saving;
		});
	};
});
