'use strict';
angular.module('WebClient').directive('dateTimePicker', function() {
    return {
        require: 'ngModel',
        restrict: 'AE',
        scope: {
            locale: '@',
            format: '@',
            options: '=?'
        },
        link: function (scope, elem, attrs, ngModel) {
            if (!angular.isDefined(scope.options)) {
                scope.options = {
                    locale: scope.locale,
                    format: scope.format
                };
            }

            elem.datetimepicker(scope.options);

            scope.instance = elem.data('DateTimePicker');

            var inputfield = elem.find('input');
            //Local event change
            inputfield.on('blur', function () {
                scope.$apply(function () {
                    if (scope.instance.date() !== null) {
                        ngModel.$setViewValue(scope.instance.date().format(scope.format));
                    }
                });
            });

            ngModel.$render = function () {
                inputfield.val(ngModel.$viewValue);
            };
        }
    };
});