(function () {

    var app = angular.module("scopeExamples", []);

    var mainController = function ($scope) {
        
    	$scope.message = "Hello World";
        $scope.nameComplexList = [];
        $scope.lastId = 10;

        $scope.addName = function (item) {
            $scope.name = " Mr. " + item;
            $scope.nameComplexList.push({ MId: $scope.lastId, Name: item });
            $scope.lastId += 1;
            $scope.numberList = numberList;
        }

        var numberList = [];
        if (numberList.length == 0) {
        	numberList.push(1);
        }

        for (var i = 0; i < 3; i++) {
        	numberList.push(numberList.length * 2);
        }
    }

    app.controller("mainController", mainController);

}());