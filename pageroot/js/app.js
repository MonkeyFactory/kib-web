var kibApp = angular.module('kibApp', ['ngRoute', 'ngResource', 'angular-carousel', 'kibAdmin']).
	config(function($routeProvider, $resourceProvider){
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
		
		.when('/page/:pageName', {
			templateUrl: 'templates/pagePageTemplate.html',
			controller: 'PagePageController'
		})
		
		.otherwise({
			redirectTo: '/'
		});
		
		//$resourceProvider.defaults.stripTrailingSlashes = false;
	}).filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	});;