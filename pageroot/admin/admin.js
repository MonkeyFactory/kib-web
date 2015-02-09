var kibAdmin = angular.module('kibAdmin', ['ngRoute', 'angularFileUpload', 'ckeditor'])
	.config(function($routeProvider){
		$routeProvider.when('/admin/adminpage/:pageName?', {
			templateUrl: 'admin/templates/adminPagePageTemplate.html',
			controller: 'AdminPageController'
		})
		
		.when('/admin/listpages',  {
			templateUrl: 'admin/templates/listPageTemplate.html',
			controller: 'ListPageController'
		})
		
		.when('/admin/adminevent/:eventId?', {
			templateUrl: 'admin/templates/adminEventPageTemplate.html',
			controller: 'AdminEventController'
		})
		
		.when('/admin/listevents',  {
			templateUrl: 'admin/templates/listEventTemplate.html',
			controller: 'ListEventController'
		})
		
		.when('/admin/uploadpage', {
			templateUrl: 'admin/templates/imageUploadPageTemplate.html',
			controller: 'ImageUploadPageController'
		})
		
		.when('/admin/leagues', {
			templateUrl: 'admin/templates/adminLeaguePageTemplate.html',
			controller: 'AdminLeagueController'
		})
		
		.when('/admin', {
			templateUrl: 'admin/templates/adminIndex.html',
			controller: 'AdminIndexController'
		})
	});

kibAdmin.directive('datetimepicker', function($timeout){
	return {
		restrict: 'A',
		scope: {
			disableTimePick: "@"
		},
		link: function ($scope, elm, attr) {
			$timeout(function(){
			console.log($scope.disableTimePick);
				if($scope.disableTimePick){
					options = { format: 'YYYY-MM-DD',
								pickTime: false,
								locale: "sv",
								sideBySide: true
						};
				}else{
					options ={ format: 'YYYY-MM-DD HH:mm',
							locale: "sv",
							sideBySide: true
					};	
				}
			
				elm.datetimepicker(options);
			},0);
		}
	}
});

kibAdmin.filter("authlevelname", function(){
	return function(level){
		switch(level){
			case 0:
				return "NOT_LOGGED_IN";
			case 1:
				return "AUTHENTICATED_USER";
			case 2:
				return "MODERATOR";
			case 3:
				return "ADMINISTRATOR";
			default:
				return "UNKNOWN";
		}
	}
});