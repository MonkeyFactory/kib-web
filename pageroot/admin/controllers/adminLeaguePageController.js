kibAdmin.controller('AdminLeagueController', function($scope, $location, kibservice, adminservice){
	//Get leagues and set state variables
	$scope.leagues = kibservice.GetLeagues();
	$scope.leagues.$promise.then(function(){
		for(i=0;i < $scope.leagues.length;i++){
			$scope.leagues[i].edit = false;
		}
	});

	var checkDataState = function(){
		for(i=0;i < $scope.leagues.length;i++){
			if($scope.leagues[i].edit){
				$scope.leagues[i].$save();
				$scope.leagues[i].edit = false;
			}
		}
	}
	
	$scope.doAdd = function(){
		checkDataState();
	
		var newLeague = adminservice.GetNewLeague();
		$scope.leagues.push(newLeague);
	}
	
	$scope.doEdit = function(league){
		checkDataState();
	
		league.edit = true;
	}
	
	$scope.saveEdit = function(league){
		checkDataState();
	}
	
	$scope.doDelete = function(league) {
		checkDataState();
		
		if(confirm("Really delete league? :(")){
			league.$delete();
			var index = $scope.leagues.indexOf(league);
			if (index > -1) {
				$scope.leagues.splice(index, 1);
			}
		}
	}
});