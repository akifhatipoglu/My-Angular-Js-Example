(function () {
    var app = angular.module("gitApiModule", []);
    app.controller("mainController", function ($scope, gitHub, $interval, $location, $anchorScroll, $log) {
    	
    	
        var answer = function (response) {
            $scope.answer = response.data;
            gitHub.getRepos($scope.answer).then(repos, error);
        };

        var error = function (ex) {
            $log.info("Error: " + JSON.stringify(ex));
            $scope.hata = "Error: " + ex;
        };

        var repos = function (response) {
            $log.info("repos: " + response.data.length);
            $scope.repoList = response.data;
            $location.hash("tablePart");
            $anchorScroll();
        };

        $scope.name = "GitHub View";

        //interval icin ekledik:
        var subjectList = [];
        subjectList.push("html");
        subjectList.push("signalr");
        subjectList.push("nodejs");

        //checkbox ile otomatik arama ozelliginin kapatilmasi icin ekledigimiz kisim
        $scope.autoSlide = true;
        var isAuto = true;
        $scope.ChangeAuto = function () {
            isAuto = $scope.autoSlide;
            if (isAuto) {
                startTimer();
            }
        }

        $scope.subjectIndex = 0;

        //geri sayimin tamamlandiginda arama yapan kisim
        var countdown = function () {
            if (isAuto) {
                $scope.timer -= 1;
            }
            if ($scope.timer < 1) {
                $scope.subject = subjectList[$scope.subjectIndex];
                $scope.search($scope.subject);
                $scope.subjectIndex += 1
                if ($scope.subjectIndex == subjectList.length) {
                    $scope.subjectIndex = 0;
                }

                $scope.timer = $scope.timerValue;
                startTimer();
            };
        };
        
        var startTimer = function () {
            $interval(countdown, 1000, $scope.timer);
        }

        //aramayi baslatan kisim
        $scope.search = function (keyword) {
            gitHub.getUser(keyword).then(answer, error);
            $scope.isim = keyword;
            if ($scope.pageType == "normal") {
                $scope.subpage = "/AJS/Ornek3subpage";
            }
            else {
                $scope.subpage = "/AJS/Ornek3lightpage";
            }
        }

        //arama detay sonuclarinin tur ve buyukten kucuge yada tersi siralamasi icin olusturdugumuz bolum
        $scope.RadioChange = function (s) {
            $scope.ascending = s;
            changeOrder(s, $scope.sortType);
        }

        $scope.DropDownChange = function (t) {
            $scope.sortType = t;
            changeOrder($scope.ascending, t);
        }

        var changeOrder = function (asc, type) {
            console.log("order");
            $scope.sortOrder = asc + type;
        }

        //kod blogunun genelinde kullandigimiz degiskenler (modeller)
        $scope.subject = "angular";
        $scope.required = "Bu alana aramak istediginizi yaziniz";
        $scope.sortOrder = "-stargazers_count";
        $scope.sortType = "stargazers_count";
        $scope.ascending = "-";
        $scope.subpage = "/AJS/Ornek3subpage";
        $scope.pageType = "normal";
        $scope.timerValue = 5;
        $scope.timer = $scope.timerValue;

        startTimer();
    });
}());