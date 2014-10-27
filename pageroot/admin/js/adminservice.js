var BaseURL = "http://localhost/modend/api";

kibAdmin.factory('adminservice', function($resource){
	var Page = $resource(BaseURL + "/page/:pageName");
	
	return {
		NewPage: function(pageArg){
			page = new Page(pageArg);
			return page.$save();
		},
		
		SavePage: function(pageName, page){
			return page.$save({pageName: pageName});
		}
	};
});