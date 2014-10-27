var BaseURL = "http://localhost/modend/api";

kibApp.factory('kibservice', function($resource){
	var Page = $resource(BaseURL + "/page/:pageName");
	
	return {
		GetPage: function(pageName){
			return Page.get({pageName: pageName});
		}
	};
});