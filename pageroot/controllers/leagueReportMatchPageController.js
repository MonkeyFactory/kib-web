kibApp.controller('LeagueReportMatchController', function($scope, $routeParams, $window, $timeout, $location, kibservice, adminservice){
	adminservice.GetAuthInfo(function(auth){
		if(auth.authlevel == 0){
			//not logged in
			$window.location.href = "/forum/ucp.php?mode=login&redirect=%23%2Fleagues%2F" + $routeParams.leagueId + "%2Freportmatch";
		}else{
			$scope.auth = auth;
		}
	});
	
	$scope.leagueId = $routeParams.leagueId;
	$scope.match = {};
	
	$scope.challenge = kibservice.GetCurrentChallenge($scope.leagueId);
	
	$scope.reportMatch = function(){
		if(!angular.isDefined($scope.selectedOpponent)){
			//form not filled in properly
			return;
		}
		
		$scope.match.Player1 = $scope.auth.userId;
		//Extract selected opponent user_id and add it to the match object
		$scope.match.Player2 = $scope.selectedOpponent.originalObject.user_id;
		
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
