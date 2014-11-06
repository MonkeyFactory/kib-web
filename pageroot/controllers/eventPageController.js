kibApp.controller('EventPageController', function($scope, kibservice){
	$scope.eventsSource = [ kibservice.GetEvents() ];

	$scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
      }
    };
	
	$scope.alertOnEventClick = function(event, allDay, jsEvent, view){
		
	};
});