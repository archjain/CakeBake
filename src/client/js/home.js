var homeapp = angular.module('homeapp', []);

homeapp.controller("contactCtrl", function($scope){

	$scope.contactUser = function(userInfo){
		alert("It's working");
	};

});