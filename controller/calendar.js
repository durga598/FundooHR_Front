angular.module('mainApp').controller("AttendenceCtrl", function ($scope, $http, $rootScope, $mdDialog, restService) {
    /**
     * variable attendanceData to store attendance of employee from API
     * variable token to store satellizer authenticate token
     */
        // console.log($rootScope.profileId);
        // console.log($rootScope.empdetails);
    $scope.day = moment();
    $rootScope.attendanceData = [];
    $rootScope.attendance = [];
    var token = localStorage.getItem('satellizer_token');
    var engineerId = $rootScope.profileId;

    /**
     * function to read attendance data with parameter timeStamp of date object 
     */

    $scope.readData = function (timeStamp) {
        $scope.timeStampData = timeStamp;
        var query = {
            token: token,
            engineerId: engineerId,
            timeStamp: timeStamp
        }
        var promise = restService.getRequest('readEmployeeMonthlyAttendance', query);
        promise.then(function (data) {
            $scope.attendance = data.data.attendanceData;
            $scope.loaderEnable = false;
        });


    }

    /**
     * function used to mark the date according to status
     */
    $scope.checkAttend = function (day) {
        var todayDate = moment();
        $scope.markedStatus = "";
        /**
         * Enables the date if it is before today.
         */
        if (todayDate.isBefore(day.date)) {
            day.enable = false;
            $scope.markedStatus = "";
            return "upcoming";
        }
        /**
         * Checks if the date is from current month and the day is enabled, then adds the attendance status
         */
        else if (day.isCurrentMonth && !todayDate.isBefore(day.date) && day.enable) {
            if (day.status.markedStatus === "true") {
                $scope.markedStatus = day.status.attendanceStatus;
                return "";
            } else {
                $scope.markedStatus = "unmark";
                return "";
            }
        }
    };
    /**
     * function to show dialog box according to attendanceStatus
     */
    $scope.selectedStatus = function (data, attendanceStatus) {
        var dataNumber = JSON.parse(data);
        $scope.id = dataNumber.number;

        $mdDialog.show({
            parent: angular.element(document.querySelector('#popupContainer')),
            templateUrl: "templates/prompt.html",
            clickOutsideToClose: false,
            scope: $scope,
            preserveScope: true,
            disableParentScroll: false,
            controller: function ($scope) {
                if (attendanceStatus === "Present") {
                    $scope.showPrompt = true;
                } else {
                    $scope.showPrompt = false;
                }

                $scope.save = function () {
                    if (attendanceStatus === "Present") {
                        postData(token, dataNumber.timeStamp, engineerId, attendanceStatus, "true", $scope.punchIn, $scope.punchOut, "NA");
                    } else {

                        postData(token, dataNumber.timeStamp, engineerId, attendanceStatus, "true", "-", "-", $scope.reason);
                    }
                    angular.element(document.getElementById($scope.id)).removeAttr('class');
                    angular.element(document.getElementById($scope.id)).addClass(attendanceStatus);
                    $scope.cancel();

                }
                $scope.cancel = function () {
                    $mdDialog.cancel();
                    $scope.punchIn = null;
                    $scope.punchOut = null;
                    $scope.reason = null;
                }
            },
        });

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

        var promise = restService.postRequest('createEmployeeDayAttendance', obj);
        promise.then(function (data) {
        });

    }

    function getTime(date) {
        if (date === "-") {
            return "-";
        } else {
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
                return "0" + (hour - 12) + ":" + min + " PM";
            }
        }
    }

});