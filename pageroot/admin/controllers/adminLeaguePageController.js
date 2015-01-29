kibAdmin.controller('AdminLeagueController', function($scope, $location, kibservice, adminservice){
	$scope.leagues = JSON.parse('[{"leagueId":"1","Name":"Demo League","Description":"This is a demo league that was automatically added","StartDate":"2015-01-15 14:07:47","EndDate":null},{"leagueId":"2","Name":"40k - Ligan v\u00e5r 2015","Description":"40k-ligan \u00e4r en sj\u00e4lvreglerande liga d\u00e4r spelare sj\u00e4lva best\u00e4mmer matcher och mission. Fokus ligger p\u00e5 att ha roligt och f\u00e5 spela m\u00e5nga intressanta matcher","StartDate":"2015-02-13 00:00:00","EndDate":"2015-03-31 00:00:00"}]');

	var inEditMode = false;
	
	$scope.doAdd = function(){
		var newLeague = {edit: true, isNew:true};
		$scope.leagues.push(newLeague);
	}
	
	$scope.doEdit = function(league){
		league.edit = true;
	}
	
	$scope.saveEdit = function(league){
		league.edit = false;
	}
	
	$scope.doDelete = function(league) {
		
	}
});