kibApp.controller('LeagueReportMatchController', function($scope, $routeParams, kibservice, adminservice){
	adminservice.GetAuthInfo(function(auth){
		if(auth.authlevel == 0){
			//not logged in
			//$location.url("/forum/ucp.php?mode=login&redirect=%23%2Fleagues%2F" + $routeParams.leagueId + "%2Freportmatch");
		}else{
			$scope.auth = auth;
		}
	});
	
	//Temp
	$scope.auth = {Username: "nojan"}
	
	$scope.match = {};
	
	$scope.reportMatch = function(){
	
	}
});
