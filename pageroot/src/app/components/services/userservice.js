'use strict';

angular.module('kibApp').factory('userservice', function($http, constants){
    
    return {
          lookup: function(user){
		      return $http.get(constants.apiPath + '/authinfo/completeusername/' + user
		                      ).then(function(response){
		                          return response.data;
		              });
	           }
    };
});