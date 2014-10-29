angular.module('kibGalleryModule', [])
	.controller('galleryController', function(){
		alert("Hello");
	})
	.directive('galleryrow', function($timeout, $document){
		return {
			restrict: 'C',
			link : function(scope, element, attr) {
				$timeout(function(){
					var selectImage = function(img){
						element.find("li > img").each(function(index){
							angular.element(this).removeClass("selectedImage").addClass("unselectedImage");
						});
				
						img.removeClass("unselectedImage").addClass("selectedImage");
					}
				
					//Set all images as unselected
					element.find("li > img").each(function(index){
						angular.element(this).addClass("unselectedImage");
					});
				
					//Setup click handler
					element.find("li > img").on("click", function(){
						img = angular.element(this);
						//alert(img.prop("tagName"));
						selectImage(img);
						
					});

					$document.on("keydown", function(event){
						var selectedImage = element.find(".selectedImage");
						if(!selectedImage)
							return;
							
						var currentLI = selectedImage.parent();
						switch(event.which){
							case 37:
								//go left
								var newLI = currentLI.prev();
								break;
							case 39:
								//go right
								var newLI = currentLI.next();
								break;
						}
						
						selectImage(newLI.find("img"));
					});
				}, 0);
			}
		}
	});