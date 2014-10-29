angular.module('kibGalleryModule', [])
	.controller('galleryController', function(){
		alert("Hello");
	})
	.directive('galleryrow', function($timeout){
		return {
			restrict: 'C',
			link : function(scope, element, attr) {
				$timeout(function(){
					//Set all images as unselected
					element.find("li > img").each(function(index){
						angular.element(this).addClass("unselectedImage");
					});
				
					//Setup click handler
					element.find("li > img").on("click", function(){
						img = angular.element(this);
						//alert(img.prop("tagName"));

						element.find("li > img").each(function(index){
							angular.element(this).removeClass("selectedImage").addClass("unselectedImage");
						});
				
					img.removeClass("unselectedImage").addClass("selectedImage");
				});
				}, 0);
			}
		}
	});