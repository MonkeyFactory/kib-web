kibApp.controller('EventPageController', function($scope, kibservice){
	$scope.eventSources = [];

	kibservice.GetEvents(function(events){
		$scope.eventSources.push(events);
	});
	 
	$scope.alertOnEventClick = function(event, allDay, jsEvent, view){
		$scope.selectedEvent = event;
		//$scope.eventCalendar.fullCalendar("option", "height", "10");
		angular.element("#calendarcontainer").animate({height: 200}, 200);
	};
	 
	$scope.closeEvent = function(){
		$scope.selectedEvent = undefined;
		angular.element("#calendarcontainer").animate({height: 620}, 200);
	}
	 
	$scope.uiConfig = {
      calendar:{
		lang: "sv",
        editable: false,
		height:600,
        header:{
          left: 'title',
          center: '',
          right: 'prev,next'
        },
        eventClick: $scope.alertOnEventClick,
      }
    };
});