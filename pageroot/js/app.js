var kibApp = angular.module('kibApp', ['ngRoute', 'ngResource', 'angular-carousel']).
	config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'templates/startPageTemplate.html',
			controller: 'StartPageController'
		})
		
		.otherwise({
			redirectTo: '/'
		});
	});