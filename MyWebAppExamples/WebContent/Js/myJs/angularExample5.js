(function () {
    var app = angular.module("gitApiModule", []);
    app.controller("mainController", function ($scope, $http, $log) {
    	
    	$log.info("call main controller");
    	 
    	$scope.name = "GitHub View";
    	$scope.required = "Search Text";
    	$scope.regex = "\\d+";

		$scope.search = function(keyword) {
			$http.get("https://api.github.com/users/" + keyword).then(
					function(response) {
						$scope.answer = response.data;
					}, function(ex) {
						$scope.error = "Error: " + ex;
					});
			$scope.name = keyword;
		};
		
		$scope.showAlert = function(item){
			if(item){
				alert("yey:" + item);
			}
		};
    });
}());