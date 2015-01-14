kibApp.controller('LeagueDetailsPageController', function($scope, $window){
	$scope.minimized = false;
	$scope.tab = "leaderboard";
	
	angular.element($window).bind("scroll", function(e) {
       $scope.minimized = true;
	   $scope.$apply();
	});
	
	$scope.leaderboard = [{Name: "Johan", Wins: "5", Draws: "4", Score: "140"},
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
						   ["Kurt", 0, 10, 10, 30, 50, 50, 50, 60]];
						
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
				"title": "",
				"isStacked": "true",
				"fill": 20,
				"displayExactValues": true,
				"vAxis": {
				  "title": "Poäng",
				  "gridlines": {
					"count": 10
				  }
				},
				"hAxis": {
				  "title": "Datum"
				}
			  },
			  "formatters": {},
			  "view": {}
		
	
	//Add players (columns)
	for(i=1;i < $scope.scorehistory.length;i++){
		$scope.chartObject.data.cols.append(
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
		row.append({"v": $scope.scorehistory[0][i]});
		
		//Add player scores
		for(x=1;i < $scope.scorehistory.length;x++){
			row.append({"v": $scope.scorehistory[x][i]});
		}
		
		$scope.chartObject.data.rows.append({"c": row});
	}
});