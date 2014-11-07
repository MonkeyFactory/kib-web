kibAdmin.controller('AdminIndexController', function($scope, $location, kibservice, adminservice){		
	adminservice.GetAuthInfo(function(auth){
		if(auth.authlevel == 0){
			//not logged in
			$location("/forum/ucp.php?mode=login&redirect=/#/admin/");
		}else{
			$scope.auth = auth;
		}
	});
});