(function(){

	var app = angular.module('loginModule', []);
	app.controller('loginController', function($http, $scope, $filter){
		
		//inizializzazione del pool
		AWSCognito.config.region = 'us-east-1';
		var poolData = {
		    UserPoolId : 'eu-central-1_pQnc4S56g', // your user pool id here
		    ClientId : '7vo6618nvbl7ajdop8o7u72g9' // your app client id here
		};
		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		var userData = {
		    Username : $scope.usernameLogin, // your username here
		    Pool : userPool
		};
		
		
	});
})();

