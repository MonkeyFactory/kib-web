kibApp.controller('StartPageController', function($scope){
	$scope.videos = ['example', 'RollingDice'];

	$scope.messages = [{Title: "Fun place to be 1", Text: "It is, isn't it?"},
					   {Title: "Fun place to be 2", Text: "It is, isn't it?"},
					   {Title: "Fun place to be 3", Text: "It is, isn't it?"}];
});