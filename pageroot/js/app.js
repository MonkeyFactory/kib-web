var kibApp = angular.module('kibApp', ['ngRoute', 'ngResource', 'angular-carousel', 'ui.calendar', 'kibAdmin', 'kibGalleryModule']).
	config(function($routeProvider, $resourceProvider, $httpProvider){
		$httpProvider.interceptors.push(function($q, $location) {
			return {
					'responseError': function(rejection) {
										alert(rejection);
	   
										return $q.reject(rejection);
									}
					};
		});
	
		$routeProvider.when('/', {
			templateUrl: 'templates/startPageTemplate.html',
			controller: 'StartPageController'
		})
		
		.when('/events', {
			templateUrl: 'templates/eventPageTemplate.html',
			controller: 'EventPageController'
		})
		
		.when('/gallery', {
			templateUrl: 'templates/galleryPageTemplate.html',
			controller: 'GalleryPageController'
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
