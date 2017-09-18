(function(){

	var app = angular.module('firstTestModule', ['ngMaterial'], function($mdThemingProvider) {
	    $mdThemingProvider.theme('docs-dark', 'default')
	      .primaryPalette('yellow')
	      .dark();
	  });
	app.controller('mioPrimoController', function($http, $scope, $filter){
		
		$scope.PostDataResponse = '';
		$scope.radioSelected = 1;
		$scope.colors = ["rosso", "blu", "giallo"];
		$scope.sizes = [720,960];
		$scope.loaderVisible = false;
		
		$scope.SelectFrame = function(){
			$('#spritespin').spritespin("api").updateFrame($scope.radioSelected-1);
		};
		
		$scope.SendData = function(){
			
			var startTime = Date.now();
			
			var data = {};
			var colore = $scope.coloreScelto;
			var dimensione = $scope.dimensioneScelta;
			$scope.loaderVisible = true;
			
			data['name'] = $scope.nome;
			data['surname'] = $scope.cognome;
			data['positionNumber'] = $scope.positionNumber;
			data['accessorio'] = $scope.accessorio;
			
			var widthSize = 960;
			var heightSize = 540;
			
			switch($scope.dimensioneScelta) {
			    case 960:
			    		widthSize = 960;
					heightSize = 540;
			        break;
			    case 720:
			    		widthSize = 720;
					heightSize = 405;
			        break;
		    		default:
			    		widthSize = 960;
					heightSize = 540;
			}
			
			data['width'] = widthSize;
			data['colore'] = colore;
			
			var config = {
	            headers : {
	                'Content-Type': 'application/json'
	            }
	        };
		
			//effettuo la chiamata
			$http.post('https://4b9knpyjtl.execute-api.eu-central-1.amazonaws.com/unaduna_test_images_stage',data, config)
			.then(function(success){
				
				$scope.PostDataResponse = success.data.responseString;
				
				//ricompongo la stringa base64 dell'immagine spritesheet che ho creato su Lambda
				var image = 'data:image/jpg;base64,';
				for(var i = 0; i < success.data.imageArray.length; i++){
					image = image + success.data.imageArray[i];
				}
				
				var dataSpin = {
						width: widthSize,
		                height: heightSize,
		                source: image,
		                frames: 8,
		                framesX: 8,
		                sense: -1,
		                responsive: false,
		                animate: false,
				};
				$('#spritespin').spritespin(dataSpin);
				var endTime = Date.now();
				$scope.TotalTime = endTime - startTime;
				$scope.loaderVisible = false;
			});
			
			$scope.nome = "";
			$scope.cognome = "";
			$scope.responseString = "";
			
		};
	});
})();

