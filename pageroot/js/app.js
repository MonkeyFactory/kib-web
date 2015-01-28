var kibApp = angular.module('kibApp', ['ngRoute', 'ngResource', 'ngAnimate', 'angular-carousel', 'ui.calendar', 'googlechart', 'angucomplete', 'kibAdmin', 'kibGalleryModule']).
	config(function($routeProvider, $resourceProvider, $httpProvider){
		$httpProvider.interceptors.push(function($q, $location, $rootScope, $window) {
			return {
					'response': function(response){
						//$rootScope.unauthorized = false;

						return response;
					},
					
					'responseError': function(rejection) {
						if(rejection.status == 401){
							$window.location.href = "/forum/ucp.php?mode=login&redirect=%2F%23%2Fadmin%2F";
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
		
		.when('/leagues', {
			templateUrl: 'templates/leagueListPageTemplate.html',
			controller: 'LeagueListPageController'
		})
		
		.when('/leagues/:leagueId', {
			templateUrl: 'templates/leagueDetailsPageTemplate.html',
			controller: 'LeagueDetailsPageController'
		})
		
		.when('/leagues/:leagueId/reportmatch', {
			templateUrl: 'templates/leagueReportMatchTemplate.html',
			controller: 'LeagueReportMatchController'
		})
		
		.otherwise({
			redirectTo: '/'
		});
		
		//$resourceProvider.defaults.stripTrailingSlashes = false;
	}).filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	});
	
/* 	.run(function($rootScope){
		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		  console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
		});
		$rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
		  console.log('$stateChangeError - fired when an error occurs during transition.');
		  console.log(arguments);
		});
		$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
		  console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
		});
		// $rootScope.$on('$viewContentLoading',function(event, viewConfig){
		//   // runs on individual scopes, so putting it in "run" doesn't work.
		//   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
		// });
		$rootScope.$on('$viewContentLoaded',function(event){
		  console.log('$viewContentLoaded - fired after dom rendered',event);
		});
		$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
		  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
		  console.log(unfoundState, fromState, fromParams);
		});
	}); */
