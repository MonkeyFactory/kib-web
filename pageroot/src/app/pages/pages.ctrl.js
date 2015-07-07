'use strict';

angular.module('kibApp').controller('PagePageController', function($scope, $stateParams, kibservice){
	$scope.page = kibservice.GetPage($stateParams.pageName);
});