kibApp.controller('LeagueReportMatchController', function($scope, $routeParams, $window, $timeout, $http, $location, kibservice, adminservice){
	adminservice.GetAuthInfo(function(auth){
		if(auth.authlevel == 0){
			//not logged in
			//$window.location.href = "/forum/ucp.php?mode=login&redirect=%23%2Fleagues%2F" + $routeParams.leagueId + "%2Freportmatch";
			$scope.auth = {authlevel: 3, userId: 2};
		}else{
			$scope.auth = auth;
		}
	});
	
	$scope.leagueId = $routeParams.leagueId;
	$scope.match = {};
	
	$scope.challenge = kibservice.GetCurrentChallenge($scope.leagueId);
	
	$scope.lookupUser = function(user){
		return $http.get('http://kibdev.crabdance.com/modend/api/authinfo/completeusername/' + user
		).then(function(response){
		  return response.data;
		});
	};
	
	$scope.reportMatch = function(){
		if(!angular.isDefined($scope.selectedPlayer2)){
			//form not filled in properly
			return;
		}
		
		if(false && $scope.auth.authlevel > 1){
			if(!angular.isDefined($scope.selectedPlayer1)){
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
		adminservice.ReportMatch($routeParams.leagueId, $scope.match)
		.success(function(){
			$scope.saving = 2;
			
			$timeout(function(){
				$location.path("/leagues/" + $routeParams.leagueId);
			}, 2000);
		})
		.error(function(data, status){
			var errorMsg = "Ett fel uppstod när matchen skulle sparas! Försök igen senare!";
			if(angular.isDefined(data.message)){
				errorMsg += "\n" + data.message;
			}
		
			$window.alert(errorMsg);
			delete $scope.saving;
		});
	}
});
