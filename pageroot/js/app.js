var kibApp = angular.module('kibApp', ['ngRoute', 'ngResource', 'angular-carousel', 'ui.calendar', 'kibAdmin', 'kibGalleryModule']).
	config(function($routeProvider, $resourceProvider, $httpProvider){
		$httpProvider.interceptors.push(function($q, $location, $rootScope) {
			return {
					'responseError': function(rejection) {
										if(rejection.status == 401){
											$location.url("/forum/ucp.php?mode=login&redirect=%2F%23%2Fadmin%2F");
										}
										else if(rejection.status == 403){
											$rootScope.unauthorized = true;
										}
				
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
