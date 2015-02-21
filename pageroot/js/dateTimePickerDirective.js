kibApp.directive("dateTimePicker", function ($rootScope) {
	return {
		require: 'ngModel',
		restrict: 'AE',
		scope: {
			pick12HourFormat: '@',
			locale: '@',
			location: '@',
			format: '@'
		},
	    link: function (scope, elem, attrs, ngModel) {
			elem.datetimepicker({
				pick12HourFormat: scope.pick12HourFormat,
				locale: scope.locale,
				format: scope.format,
				sideBySide: true
			})

		scope.instance = elem.data("DateTimePicker");;
		
			//Local event change
			elem.on('blur', function () {

				/*console.info('this', this);
				console.info('scope', scope);
				console.info('attrs', attrs); */


				/*// returns moments.js format object
				scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
				// Global change propagation 

				$rootScope.$broadcast("emit:dateTimePicker", {
					action: 'changed',
					dateTime: scope.dateTime
					}); */
			    
			    scope.$apply(function(){
				ngModel.$setViewValue(scope.instance.date().format('YYYY-MM-DD HH:mm:ss'));
			    });
			})
		}
	};
 });
