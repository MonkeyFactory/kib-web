kibApp.controller('LeagueReportMatchController', function($scope, $routeParams, $location, $timeout, kibservice, adminservice){
	adminservice.GetAuthInfo(function(auth){
		if(auth.authlevel == 0){
			//not logged in
			$location.url("/forum/ucp.php?mode=login&redirect=%23%2Fleagues%2F" + $routeParams.leagueId + "%2Freportmatch");
		}else{
			$scope.auth = auth;
		}
	});
	
	$scope.leagueId = $routeParams.leagueId;
	$scope.match = {};
	
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
				$location.path("/league/" + $routeParams.leagueId);
			}, 2000);
		})
		.error(function(){
			alert("Ett fel uppstod när matchen skulle sparas! Försök igen senare!");
			delete $scope.saving;
		});
	}
});
