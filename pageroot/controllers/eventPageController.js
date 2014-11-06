kibApp.controller('EventPageController', function($scope, kibservice){
	$scope.eventSources = [];

	kibservice.GetEvents(function(events){
		$scope.eventSources.push(events);
	});
	 
	$scope.alertOnEventClick = function(event, allDay, jsEvent, view){
		$scope.selectedEvent = event;
	};
	 
	$scope.uiConfig = {
      calendar:{
		lang: "sv",
        editable: false,
		height:500,
        header:{
          left: 'title',
          center: '',
          right: 'prev,next'
        },
        eventClick: $scope.alertOnEventClick,
      }
    };
});