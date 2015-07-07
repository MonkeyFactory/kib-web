angular.module('kibApp').directive('loading', function($document){
		return {
			restrict: 'E',
			transclude: true,
			template: '<div class="loading-container">\
						<div class="loading-text" ng-transclude></div>\
						<div class="spinner-cube">\
							<div>\
								<div class="dot dot-one"></div>\
							</div>\
							<div>\
								<div class="dot dot-two1"></div>\
								<div class="dot dot-two2"></div>\
							</div>\
						</div>\
					</div>'
		}
	});