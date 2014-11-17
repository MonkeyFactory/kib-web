kibApp.directive('bgVideo', function($document){
		return {
			scope: {
				videos: '=',
				
			},
			restrict: 'E',
			template: '<video />',
			link: function(scope, element, attr) {
				console.log(scope.videos);
			}
		}
	});