kibApp.controller('EventPageController', function($scope, kibservice){
	$scope.eventSources = [];

	kibservice.GetEvents(function(events){
		$scope.eventSources.push(events);
	});
	 
	$scope.alertOnEventClick = function(event, allDay, jsEvent, view){
		alert(event.Title + " - " + event.Description);
	};
	 
	$scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        header:{
          left: 'title',
          center: '',
          right: 'prev,next'
        },
        eventClick: $scope.alertOnEventClick,
      }
    };
});