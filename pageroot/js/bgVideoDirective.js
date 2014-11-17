kibApp.directive('bgVideo', function($document){
		return {
			scope: {
				videos: '=',
			},
			restrict: 'E',
			template: '<video muted/>',
			link: function(scope, element, attr) {
				var nextVideo = function(){
					if(scope.currentVideo != undefined){
						scope.currentVideo += 1;
						if(scope.currentVideo > scope.videos.length - 1){
							scope.currentVideo = 0;
						}
					}else{
						scope.currentVideo = 0;
					}
					
					console.log("Playing video " + scope.currentVideo + " = " + scope.videos[scope.currentVideo]);
				
					video = element.find("video");
					videofile = "media/video/" + scope.videos[scope.currentVideo];
					video.html(angular.element('<source src="' + videofile + '.mp4" type="video/mp4"/>'));
					video.append(angular.element('<source src="' + videofile + '.webm" type="video/webm"/>'));
					video.append(angular.element('<source src="' + videofile + '.ogv" type="video/ogg"/>'));
					
					video.get(0).play();
				}
			
				element.find("video").on("ended", function(){
					console.log("Video ended");
					nextVideo();
				});
				
				//Trigger playback start
				nextVideo();
			}
		}
	});