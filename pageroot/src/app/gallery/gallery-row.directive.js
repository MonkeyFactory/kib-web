'use strict';

angular.module('kibGalleryModule', [])
	.directive('galleryRow', function($timeout, $document, $window){
		return {
			scope: {
				images: '=',
				name: '@'
			},
			restrict: 'E',
			templateUrl: 'app/gallery/gallery-row.template.html',
			link : function(scope, element) {
				$timeout(function(){
					$timeout(function(){
						var selectImage = function(img){
							angular.element('.galleryImage').each(function(){
								angular.element(this).removeClass('selectedImage').addClass('unselectedImage');
							});
					
							img.removeClass('unselectedImage').addClass('selectedImage');
							resizeContainer();
							alignContainer();
						};
					
						var alignContainer = function(){
							var container = element.find('.galleryrowinner');
							var selectedImage = element.find('.selectedImage');
							if(!selectedImage.prop('tagName')){
								container.css('left', '0');
								return;
							}
								
								
							var imagePos = selectedImage.position();
							imagePos.left += container.position().left;

							if(imagePos.left  > $window.innerWidth - selectedImage.width()){
								container.css('left', (container.position().left - selectedImage.width()) + 'px');
							}else if(imagePos.left < 0){
								container.css('left', (container.position().left + selectedImage.width()) + 'px');
							}
						};

						var resizeContainer = function(){
							var totWidth = 0;
							element.find('img').each(function(){			
								totWidth += angular.element(this).outerWidth(true) + 10;
							});	
							
							element.find('.galleryrowinner').width(totWidth);	
						};
					
						//Set all images as unselected
						element.find('img').each(function(){			
							angular.element(this).addClass('unselectedImage');
						});					
									
						resizeContainer();

						//Setup click handler
						element.find('img').on('click', function(){
							var img = angular.element(this);
							selectImage(img);
						});

						$document.on('keydown', function(event){
							var selectedImage = element.find('.selectedImage');
							if(!selectedImage.prop('tagName')){
								return;
							}
								
							var currentLI = selectedImage.parent();
							var newLI;
							switch(event.which){
								case 27:
									//exit
									selectedImage.removeClass('selectedImage').addClass('unselectedImage');
									return;
								case 37:
									//go left
									newLI = currentLI.prev();
									break;
								case 39:
									//go right
									newLI = currentLI.next();
									break;
							}
							
							selectImage(newLI.find('img'));
						});
					}, 0);
				}, 0);
			}
		};
	});