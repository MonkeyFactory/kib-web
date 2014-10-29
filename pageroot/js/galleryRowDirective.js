angular.module('kibGalleryModule', [])
	.directive('galleryRow', function($timeout, $document){
		return {
			restrict: 'E',
			templateUrl: 'templates/galleryRowTemplate.html',
			link : function(scope, element, attr) {
				$timeout(function(){
					var selectImage = function(img){
						element.find("img").each(function(index){
							angular.element(this).removeClass("selectedImage").addClass("unselectedImage");
						});
				
						img.removeClass("unselectedImage").addClass("selectedImage");
						resizeContainer();
						
					}
				

					var resizeContainer = function(){
						var totWidth = 0;
						element.find("img").each(function(index){			
							totWidth += angular.element(this).outerWidth(true) + 10;
						});	
						
						element.find(".galleryrowinner").width(totWidth);	
					}
				
					//Set all images as unselected
					element.find("img").each(function(index){			
						angular.element(this).addClass("unselectedImage");
					});					
								
					resizeContainer();

					//Setup click handler
					element.find("img").on("click", function(){
						img = angular.element(this);
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