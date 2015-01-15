kibApp.controller('LeagueDetailsPageController', function($scope, $window, $routeParams, kibservice){
	$scope.minimized = false;
	$scope.tab = "leaderboard";
	$scope.loading = true;
	
	angular.element($window).bind("scroll", function(e) {
       $scope.minimized = true;
	   $scope.$apply();
	});
	
	$scope.league = kibservice.GetLeague($routeParams.leagueId);
	$scope.leaderboard = kibservice.GetLeaderboard($routeParams.leagueId);
	
	$scope.scorehistory = kibservice.GetScoreHistory($routeParams.leagueId);
	$scope.scorehistory.$promise.then(function(){
		if($scope.scorehistory.length == 0)
			return;
		
		//Add players (columns)
		for(i=1;i < $scope.scorehistory.length;i++){
			$scope.chartObject.data.cols.push(
				{
					"id": $scope.scorehistory[i][0] + "-id",
					"label": $scope.scorehistory[i][0],
					"type": "number",
					"p": {}
				}
			);
		}
	
		//Add score (rows)
		for(i=1;i < $scope.scorehistory[0].length;i++){
			row = []
			
			//Add month to row
			row.push({"v": $scope.scorehistory[0][i]});
			
			//Add player scores
			for(x=1;x < $scope.scorehistory.length;x++){
				row.push({"v": $scope.scorehistory[x][i]});
			}
			
			$scope.chartObject.data.rows.push({"c": row});
		}
	});
	
	$scope.league.$promise.then(isLoadCompleted());
	$scope.leaderboard.$promise.then(isLoadCompleted());
	
	/*$scope.leaderboard = [{Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
						  {Name: "Johan", Wins: "5", Draws: "4", Score: "140"}];
						  
	$scope.scorehistory = [["", "2014-12-01", "2014-12-08", "2014-12-14", "2014-12-15", "2014-12-20", "2014-12-27", "2015-01-01", "2015-01-04"],
						   ["Johan", 20, 20, 40, 50, 50, 70, 80, 80],
						   ["Erik", 10, 10, 20, 20, 20, 40, 40, 40],
						   ["Niklas", 0, 20, 20, 30, 50, 50, 50, 50],
						   ["Kim", 10, 20, 20, 30, 40, 40, 40, 50],
						   ["Joakim", 0, 0, 10, 10, 10, 10, 10, 10],
						   ["Roger", 20, 30, 30, 50, 60, 60, 60, 80],
						   ["Kurt", 0, 10, 10, 30, 50, 50, 50, 60]];*/
						
	$scope.chartObject = {
			  "type": "LineChart",
			  "displayed": true,
			  "data": {
				"cols": [
				  {
					"id": "date",
					"label": "Datum",
					"type": "string",
					"p": {}
				  }],
				"rows": [ ]
			  },
	    "options": {
		"title": "Poängkurva",
		"titlePosition": "none",
		"chartArea": {"height": "400"},
				"isStacked": "true",
				"fill": 20,
				"displayExactValues": true,
			      "vAxis": {
				  "titleTextStyle": {"color": "#353B31"},
				  "title": "Poäng",
				  "gridlines": {
					"count": 10
				  }
				},
			      "hAxis": {
				  "titleTextStyle": {"color": "#353B31"},
				  "title": "Datum"
				}
			  },
			  "formatters": {},
			  "view": {}
		};
 
	function isLoadCompleted(){
		$scope.loading = $scope.league.resolved && $scope.leaderboard.resolved && $scope.scorehistory.resolved;
	}
});
