angular.module('mainApp').service('commonMethod', commonMethod);
function commonMethod($http) {
    this.readData = function (timestamp) {
        console.log("read");

        $http({
            "method": "GET",
            "url": "http://192.168.0.118:3000/readEmployeeMonthlyAttendance?token=f12sd1fd2sf1&engineerId=427188EI&timeStamp=" + timestamp
        }).then(function (data) {
            console.log(data);
            $scope.attendance = data.data.attendanceData;
        })
    };
    this.checkAttend = function (day) {
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
    this.someD = function (data, attendanceStatus) {
        var dataNumber = JSON.parse(data);
        $scope.id = dataNumber.number;
        console.log('date id ', dataNumber.number);

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
                        console.log("called save");
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
                        console.log($scope.reason);
                        console.log("called save");
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
    this.postData = function (token, timeStamp, engineerId, attendanceStatus, markedStatus, punchIn, punchOut, reason) {
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
        $http({
            "method": "POST",
            "url": "http://192.168.0.118:3000/createEmployeeDayAttendance",
            "data": obj,
        }).then(function (data) {
            console.log(data);
            //$scope.attendance = data.data.attendanceData;
        })
    };
    this.getTime = function (date) {
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


}