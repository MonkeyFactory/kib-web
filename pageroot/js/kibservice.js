var BaseURL = "http://localhost/modend/api";

kibApp.factory('kibservice', function($resource){
	var Page = $resource(BaseURL + "/page/:pageId");
	
	return {
		GetPage: function(pageId){
			return Page.get({pageId: pageId});
		}
	};
});