angular.module('kibGalleryModule', [])
	.controller('galleryController', function(){
		alert("Hello");
	})
	.directive('galleryrow', function($timeout){
		return {
			restrict: 'C',
			link : function(scope, element, attr) {
				$timeout(function(){
					element.find("li > img").on("click", function(){
						img = angular.element(this);
						//alert(img.prop("tagName"));

						element.find("li > img").each(function(index){
						angular.element(this).css("height", "200px");
					});
				
					img.css("height", "400px");
				});
				}, 0);
			}
		}
	});