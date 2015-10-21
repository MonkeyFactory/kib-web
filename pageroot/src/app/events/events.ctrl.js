'use strict';

angular.module('kibApp').controller('EventPageController', function($scope, kibservice, $window){
	$scope.eventSources = [];

	kibservice.GetEvents(function(events){
		$scope.eventSources.push(events);
	});
	 
	$scope.alertOnEventClick = function(event){
		$scope.selectedEvent = event;
		//$scope.eventCalendar.fullCalendar('option', 'height', '10');
		angular.element('#calendarcontainer').animate({height: 200}, 200);
	};
	 
	$scope.closeEvent = function(){
		$scope.selectedEvent = undefined;
		angular.element('#calendarcontainer').animate({height: 620}, 200);
	};
	 
	$scope.uiConfig = {
      calendar:{
		lang: 'sv',
        editable: false,
		height: ($window.innerWidth > 768) ? 600 : 400,
        header:{
          left: 'title',
          center: '',
          right: 'prev,next'
        },
        eventClick: $scope.alertOnEventClick
      }
    };
	
	angular.element($window).on('resize.doResize', function (){
        $scope.$apply(function(){
           if($window.innerWidth < 768){
				$scope.uiConfig.calendar.height = 400;
		   }else{
				$scope.uiConfig.calendar.height = 600;
		   }
        });
    });

    $scope.$on('$destroy',function (){
         angular.element($window).off('resize.doResize'); //remove the handler added earlier
    });
});