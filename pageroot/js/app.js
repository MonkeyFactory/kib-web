var kibApp = angular.module('kibApp', ['ngRoute', 'ngResource']).
	config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'templates/startPageTemplate.html',
			controller: 'StartPageController'
		})
		
		.otherwise({
			redirectTo: '/'
		});
	});