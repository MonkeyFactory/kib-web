'use strict';

angular.module('kibAdmin', ['ui.router', 'angularFileUpload', 'ckeditor', 'kibConstants'])
	.config(function($stateProvider){
		$stateProvider
			.state('admin', {
				abstract:true,
				templateUrl: 'admin/main/main.html',
				controller: 'MainAdminCtrl'
			})
			.state('admin.start', {
				url: '/admin',
				templateUrl: 'admin/start/start.template.html',
				controller: 'AdminIndexController'
			})
			.state('admin.adminpage', {
				url: '/admin/adminpage/:pageName?',
				templateUrl: 'admin/pages/admin-pages.template.html',
				controller: 'AdminPageController'
			})
			.state('admin.listpages', {
				url: '/admin/listpages',
				templateUrl: 'admin/pages/list-pages.template.html',
				controller: 'ListPageController'
			})
			.state('admin.adminevent', {
				url: '/admin/adminevent/:eventId?',
				templateUrl: 'admin/events/admin-events.template.html',
				controller: 'AdminEventController'
			})
			.state('admin.listevents', {
				url: '/admin/listevents',
				templateUrl: 'admin/events/list-events.template.html',
				controller: 'ListEventController'
			})
			.state('admin.leagues', {
				url: '/admin/leagues',
				templateUrl: 'admin/league/league.template.html',
				controller: 'AdminLeagueController'
			})
			.state('admin.matches', {
				url: '/admin/matches',
				templateUrl: 'admin/league/matches.template.html',
				controller: 'AdminMatchesController'
			});

		
			/*	.when('/admin/uploadpage', {
			templateUrl: 'admin/templates/imageUploadPageTemplate.html',
			controller: 'ImageUploadPageController'*/
	});

// kibAdmin.directive('datetimepicker', function($timeout){
	// return {
		// restrict: 'A',
		// scope: {
			// disableTimePick: '@'
		// },
		// link: function ($scope, elm, attr) {
			// $timeout(function(){
			// console.log($scope.disableTimePick);
				// if($scope.disableTimePick){
					// options = { format: 'YYYY-MM-DD',
								// locale: 'sv',
								// sideBySide: true
						// };
				// }else{
					// options ={ format: 'YYYY-MM-DD HH:mm',
							// locale: 'sv',
							// sideBySide: true
					// };	
				// }
			
				// elm.datetimepicker(options);
			// },0);
		// }
	// }
// });

angular.module('kibAdmin').filter('authlevelname', function(){
	return function(level){
		switch(level){
			case 0:
				return 'NOT_LOGGED_IN';
			case 1:
				return 'AUTHENTICATED_USER';
			case 2:
				return 'MODERATOR';
			case 3:
				return 'ADMINISTRATOR';
			default:
				return 'UNKNOWN';
		}
	};
});