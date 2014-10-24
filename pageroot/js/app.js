var kibApp = angular.module('kibApp', ['ngRoute', 'ngResource', 'angular-carousel']).
	config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'templates/startPageTemplate.html',
			controller: 'StartPageController'
		})
		
		.when('/events', {
			templateUrl: 'templates/eventPageTemplate.html',
			controller: 'EventPageController'
		})
		
		.when('/gallery', {
			templateUrl: 'templates/eventPageTemplate.html',
			controller: 'EventPageController'
		})
		
		.when('/forum', {
			templateUrl: 'templates/eventPageTemplate.html',
			controller: 'EventPageController'
		})
		
		.otherwise({
			redirectTo: '/'
		});
	});