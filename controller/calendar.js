/**
 * @fileName:calendar.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @controller : AttendenceCtrl to control calendar
 */

angular.module('mainApp').controller("AttendenceCtrl", function ($scope, $http, $rootScope, $mdDialog, restService) {

    $scope.day = moment();
    $rootScope.attendanceData = [];
    $rootScope.attendance = [];
    /**
     * variable attendanceData to store attendance of employee from API
     * variable token to store satellizer authenticate token
     */
    var token = localStorage.getItem('satellizer_token');
    var engineerId = $rootScope.profileId;

    /**
     * @function readData
     * @param timeStamp
     * function to read attendance data with parameter timeStamp of date object 
     */

    $scope.readData = function (timeStamp) {

        $scope.timeStampData = timeStamp;
        var query = {
            engineerId: engineerId,
            timeStamp: timeStamp
        }
        var config = {
            'x-token': token
        };
        var promise = restService.getRequest('readEmployeeMonthlyAttendance', config, query);
        promise.then(function (data) {
            $scope.attendance = data.data.attendanceData;
            $scope.loaderEnable = false;
        });


    }

    /**
     * function used to mark the date according to status
     */
    var i = 0;
    $scope.checkAttend = function (day) {
        
              console.log(i++);
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
                /**
                 * Checks attendanceStatus: if Present then shows input: inTime & outTime
                 * if leave/CompLeave shows input : reason
                 */
                if (attendanceStatus === "Present") {
                    $scope.showPrompt = true;
                } else {
                    $scope.showPrompt = false;
                }

                /**
                 * @function save : postData with param to API
                 */

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

                /**
                 * @function cancel : to close dialog
                 * reset all input value to null
                 */
                $scope.cancel = function () {
                    $mdDialog.cancel();
                    $scope.punchIn = null;
                    $scope.punchOut = null;
                    $scope.reason = null;
                }
            },
        });

    };

    /**
     * @function postData : @param
     * token : satellizer token
     * timeStamp : timeStamp data when function save called
     * engineerId : engineerId
     * attendanceStatus : Present/leave/CompLeave
     * markedStatus : boolean
     * punchIn : in time
     * punchOut : out time
     * reason : reason for leave
     */

    function postData(token, timeStamp, engineerId, attendanceStatus, markedStatus, punchIn, punchOut, reason) {
        var config = {
            'x-token': token
        };
        obj = {};
        obj["timeStamp"] = timeStamp * 1000;
        obj["engineerId"] = engineerId;
        obj["attendanceStatus"] = attendanceStatus;
        obj["markedStatus"] = markedStatus;
        obj["punchIn"] = getTime(punchIn);
        obj["punchOut"] = getTime(punchOut);
        obj["reason"] = reason;

        var promise = restService.postRequest('createEmployeeDayAttendance', config, obj);
        promise.then(function (data) {});

    }

    /**
     * @function getTime : convert to 12 hour time
     * @param : date object
     * return : 12 hour time
     */

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
            } else if (hour > 21) {
                return (hour - 12) + ":" + min + " PM";
            } else if (hour > 12) {
                return "0" + (hour - 12) + ":" + min + " PM";
            }
        }
    }

});