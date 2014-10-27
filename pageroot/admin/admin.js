var kibAdmin = angular.module('kibAdmin', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/admin/adminpage/:pageName?', {
			templateUrl: 'admin/templates/adminPagePageTemplate.html',
			controller: 'AdminPageController'
		})
	});
	
kibAdmin.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0]);

            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}])