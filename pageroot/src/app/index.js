'use strict';

angular.module('kibApp', ['ngResource', 'ui.router', 'ui.bootstrap', 'angular-carousel', 'ui.calendar', 'googlechart', 'angucomplete-alt', 'kibAdmin', 'kibGalleryModule'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        abstract:true,
        templateUrl: 'app/main/main.html',
        controller: 'MainAdminCtrl'
      })
	  .state('main.start', {
        url: '/',
        templateUrl: 'app/start/start.template.html',
        controller: 'StartPageController'
      })
	  .state('main.events', {
        url: '/events',
        templateUrl: 'app/events/events.template.html',
        controller: 'EventPageController'
      })
	  .state('main.gallery', {
        url: '/gallery',
        templateUrl: 'app/gallery/gallery-page.template.html',
        controller: 'GalleryPageController'
      })
	  .state('main.pages', {
        url: '/page/:pageName',
        templateUrl: 'app/pages/pages.template.html',
        controller: 'PagePageController'
      })
	  .state('main.leaguelist', {
        url: '/leagues',
        templateUrl: 'app/league/list.template.html',
        controller: 'LeagueListPageController'
      })
	  .state('main.leaguedetails', {
        url: '/leagues/:leagueId',
        templateUrl: 'app/league/details.template.html',
        controller: 'LeagueDetailsPageController'
      })
	  .state('main.reportmatch', {
        url: '/leagues/:leagueId/reportmatch',
        templateUrl: 'app/league/reportmatch.template.html',
        controller: 'LeagueReportMatchController'
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function($resourceProvider, $httpProvider){
		$httpProvider.interceptors.push(function($q, $location, $rootScope, $window) {
			return {
					'response': function(response){
						//$rootScope.unauthorized = false;

						return response;
					},
					
					'responseError': function(rejection) {
						if(rejection.status === 401){
							$window.location.href = '/forum/ucp.php?mode=login&redirect=%2F%23%2Fadmin%2F';
						}
						else if(rejection.status === 403){
							$rootScope.unauthorized = true;
						}

						return $q.reject(rejection);
					}
					
					};
		
	});
})
.filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
});