'use strict';

angular.module('kibAdmin').controller('MainAdminCtrl', function($scope, $location, kibservice, adminservice){		
	adminservice.GetAuthInfo(function(auth){
		if(auth.authlevel === 0){
			//not logged in
			$location.url('/forum/ucp.php?mode=login&redirect=%2F%23%2Fadmin%2F');
		}else{
			$scope.auth = auth;
		}
	});
});