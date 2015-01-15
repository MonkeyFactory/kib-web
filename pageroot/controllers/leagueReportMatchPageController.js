kibApp.controller('LeagueReportMatchController', function($scope, $routeParams, $location, kibservice, adminservice){
	adminservice.GetAuthInfo(function(auth){
		if(auth.authlevel == 0){
			//not logged in
			$location.url("/forum/ucp.php?mode=login&redirect=%23%2Fleagues%2F" + $routeParams.leagueId + "%2Freportmatch");
		}else{
			$scope.auth = auth;
		}
	});
	
	$scope.match = {};
	
	$scope.reportMatch = function(){
	
	}
});
