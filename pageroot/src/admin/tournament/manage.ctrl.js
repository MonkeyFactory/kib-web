'use strict';

angular.module('kibAdmin').controller('AdminTournamentsList', function($state, $modal, $scope){
	$scope.tournaments = [{name: 'Smackdown 2015', date:'2015-07-11 08:00', status: 'In Progress', tournamentId: '101'}];
	
	$scope.openTournament = function(tournamentId){
		$state.go('admin.tournament-admin', {tournamentId: tournamentId});	
	};
	
	$scope.doEdit = function(tournament){
		$modal.open({
		  templateUrl: 'admin/tournament/add-edit-tournament.template.html',
		  controller: 'AddEditTournamentCtrl',
		  size: 'sm',
		  resolve: {
			tournament: function () {
			  return tournament;
			}
		  }
    	});	
	};
	
	$scope.doNew = function(){
		$scope.doEdit(null);	
	};
});