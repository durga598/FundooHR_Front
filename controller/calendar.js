angular.module('mainApp').controller("AttendenceCtrl", function ($scope, $http, $rootScope, $mdDialog,restService) {

   

    $scope.day = moment();
    $rootScope.attendanceData = [];
    $rootScope.attendance = [];
  var token = localStorage.getItem('satellizer_token');
    $scope.readData = function (timeStamp) {
        var query = {
            token: token,
            engineerId:"427188EI",
            timeStamp : timeStamp
        }
        var promise = restService.getRequest('readEmployeeMonthlyAttendance',query);
        promise.then(function(data){
            $scope.attendance = data.data.attendanceData;
            $scope.loaderEnable = false ;
        });

        
    }


    $scope.checkAttend = function (day) {
        var todayDate = moment();
        $scope.markedStatus = "";

        if (todayDate.isBefore(day.date)) {
            day.enable = false;
            $scope.markedStatus = "";
            return "upcoming";
        } else if (day.isCurrentMonth && !todayDate.isBefore(day.date) && day.enable) {
            if (day.status.markedStatus === "true") {
                $scope.markedStatus = day.status.attendanceStatus;
                return "";
            } else {
                $scope.markedStatus = "unmark";
                return "";
            }
        }
    };
    $scope.someD = function (data, attendanceStatus) {
        var dataNumber = JSON.parse(data);
        $scope.id = dataNumber.number;
       

        if (attendanceStatus === "Present") {
            $mdDialog.show({
                parent: angular.element(document.querySelector('#popupContainer')),
                templateUrl: "templates/prompt.html",
                clickOutsideToClose: false,
                scope: $scope,
                preserveScope: true,
                disableParentScroll: false,
                controller: function ($scope) {
                    $scope.save = function () {
                        
                        postData("f12sd1fd2sf1", dataNumber.timeStamp, "427188EI", attendanceStatus, "true", $scope.punchIn, $scope.punchOut, "NA");
                        
                        angular.element(document.getElementById($scope.id)).removeAttr('class');
                        angular.element(document.getElementById($scope.id)).addClass(attendanceStatus);
                        $scope.cancel();

                    }
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    }
                },
            });
        } else if (attendanceStatus === "Leave" || attendanceStatus === "CompLeave") {
            $mdDialog.show({
                parent: angular.element(document.querySelector('#popupContainer')),
                templateUrl: "templates/prompt1.html",
                clickOutsideToClose: false,
                scope: $scope,
                preserveScope: true,
                controller: function ($scope) {
                    $scope.save = function () {
                        postData("f12sd1fd2sf1", dataNumber.timeStamp, "427188EI", attendanceStatus, "true", "-", "-", $scope.reason); 
                        angular.element(document.getElementById($scope.id)).removeAttr('class');
                        angular.element(document.getElementById($scope.id)).addClass(attendanceStatus);
                        $scope.cancel();
                    }
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    }
                },
                disableParentScroll: false,
            });
        }
    };

    function postData(token, timeStamp, engineerId, attendanceStatus, markedStatus, punchIn, punchOut, reason) {
        obj = {};
        obj["token"] = token;
        obj["timeStamp"] = timeStamp * 1000;
        obj["engineerId"] = engineerId;
        obj["attendanceStatus"] = attendanceStatus;
        obj["markedStatus"] = markedStatus;
        obj["punchIn"] = getTime(punchIn);
        obj["punchOut"] = getTime(punchOut);
        obj["reason"] = reason;

        console.log(obj);
        var promise = restService.postRequest('createEmployeeDayAttendance',obj);
        promise.then(function(data){
            console.log(data);
        });
       
    }

    function getTime(date) {
        console.log(date);
        if (date === "-") {
            return "-";
        } 
        else {
            var hour = date.getHours(),
                min = date.getMinutes();
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (hour < 12) {

                return hour + ":" + min + " AM";
            } else if (hour == 12) {
                return hour + ":" + min + " PM";
            } else {
                return "0"+(hour - 12) + ":" + min + " PM";
            }
        }
    }

});