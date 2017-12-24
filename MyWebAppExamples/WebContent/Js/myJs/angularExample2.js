(function () {

    var app = angular.module("gitApiModule", []);

    var mainController = function ($scope, $http) {
    	
    	$scope.name = "GitHub View";
    	$scope.required = "Search Text";
    	
        var answer = function (response) {
            $scope.answer = response.data;
        };

        var error = function (ex) {
            $scope.error = "Error: " + ex;
        };

        $scope.search = function (keyword) {
            $http.get("https://api.github.com/users/" + keyword).then(answer, error);
            $scope.name = keyword;
        }
    };

    app.controller("mainController", mainController);

}());