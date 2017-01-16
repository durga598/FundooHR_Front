angular.module('mainApp').controller("AttendenceCtrl", function ($scope, $http, $rootScope, $mdDialog) {

    console.log("calendar...");

    $rootScope.status = '  ';
    $rootScope.customFullscreen = false;

    //moment object to get date
    $scope.day = moment();
    $rootScope.attendanceData = [];
    $rootScope.attendance = [];
    //    var promise = $http.get("assets/attendance.json").then(function (response) {
    //     	$rootScope.attendance = response.data[0];
    //     	$scope.attendance = response.data[0];
    //     	// console.log(response.data[0]);
    //     	$rootScope.attendanceData = Object.keys(response.data[0]);
    //     	//   console.log(attendance[1].attendanceStatus);
    //     	console.log('called1');
    //     	//   console.log($rootScope.attendance);
    //     });
    // $scope.$watch("selected", function (old, newData) {
    //     //console.log(old, newData)
    // });
    $scope.readData = function (timestamp) {
        console.log("read");

        // console.log($scope.selected.unix());
        $http({
            "method": "GET",
            "url": "http://192.168.0.171:3000/readEmployeeMonthlyAttendance?token=f12sd1fd2sf1&engineerId=427188EI&timeStamp=" + timestamp
        }).then(function (data) {
            console.log(data);
            $scope.attendance = data.data.attendanceData;
        })
    }




    //$scope.incr = 0;

    $scope.checkAttend = function (day) {
        //console.log("called " + $scope.incr++);
        //console.log(day.date)
        var todayDate = moment();
        $scope.markedStatus = "";
        //console.log(todayDate.isBefore(day.date), day.date, todayDate);

        if (todayDate.isBefore(day.date)) {
            // console.log("upcoming");
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
        //console.log($scope.markedStatus);
    };
    $scope.someD = function (data, attendanceStatus) {
        //storeAttendence = {};
        var dataNumber = JSON.parse(data);
        $scope.id = dataNumber.number;
        console.log('date id ', dataNumber.number);
        
        if (attendanceStatus === "Present") {
            $mdDialog.show({
                parent: angular.element(document.querySelector('#attendence')),
                templateUrl: "templates/prompt.html",
                clickOutsideToClose: false,
                scope: $scope,
                preserveScope: true,
                disableParentScroll: false,
                controller: function ($scope) {
                    $scope.save = function () {
                        console.log("called save");
                        //item = {};
                        $scope.storeAttendence = {};
                        console.log($scope.storeAttendence);
                        $scope.storeAttendence["token"] = "f12sd1fd2sf1";
                        $scope.storeAttendence["timeStamp"] = dataNumber.timeStamp * 1000;
                        $scope.storeAttendence["engineerId"] = "427188EI";
                        $scope.storeAttendence["attendanceStatus"] = attendanceStatus;
                        $scope.storeAttendence["markedStatus"] = "true";
                        $scope.storeAttendence["punchIn"] = getTime($scope.punchIn);
                        $scope.storeAttendence["punchOut"] = getTime($scope.punchOut);
                        $scope.storeAttendence["reason"] = "NA";

                        //item[dataNumber.number] = $scope.storeAttendence;

                        // console.log($scope.storeAttendence, item);
                        //$scope.markedStatus = attendanceStatus;
                        // token=f12sd1fd2sf1&engineerId=427188EI
                        postData($scope.storeAttendence);
                       //console.log($scope.markedStatus);
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
                parent: angular.element(document.querySelector('#attendence')),
                templateUrl: "templates/prompt1.html",
                clickOutsideToClose: false,
                scope: $scope,
                preserveScope: true,
                controller: function ($scope) {
                    $scope.save = function () {
                        console.log($scope.reason);
                        console.log("called save");
                        item = {};
                        $scope.storeAttendence = {};
                        $scope.storeAttendence["token"] = "f12sd1fd2sf1";
                        $scope.storeAttendence["timeStamp"] = dataNumber.timeStamp * 1000;
                        $scope.storeAttendence["engineerId"] = "427188EI";
                        $scope.storeAttendence["attendanceStatus"] = attendanceStatus;
                        $scope.storeAttendence["markedStatus"] = "true";
                        $scope.storeAttendence["punchIn"] = "-";
                        $scope.storeAttendence["punchOut"] = "-";
                        $scope.storeAttendence["reason"] = $scope.reason;
                        //item[dataNumber.number] = storeAttendence;

                        //console.error($scope.markedStatus);
                        console.log($scope.storeAttendence);
                        //$scope.markedStatus[dataNumber.number] = attendanceStatus;
                        postData($scope.storeAttendence);
                        //console.error($scope.markedStatus);
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
        // else if(attendanceStatus === "unmark"){
        //     item = {};
        //                 $scope.storeAttendence = {};
        //                 $scope.storeAttendence["token"] = "f12sd1fd2sf1";
        //                 $scope.storeAttendence["timeStamp"] = dataNumber.timeStamp * 1000;
        //                 $scope.storeAttendence["engineerId"] = "427188EI";
        //                 $scope.storeAttendence["attendanceStatus"] = "";
        //                 $scope.storeAttendence["markedStatus"] = "false";
        //                 $scope.storeAttendence["punchIn"] = "-";
        //                 $scope.storeAttendence["punchOut"] = "-";
        //                 $scope.storeAttendence["reason"] = $scope.reason;
        //                 //item[dataNumber.number] = storeAttendence;

        //                 //console.error($scope.markedStatus);
        //                 console.log($scope.storeAttendence);
        //                 //$scope.markedStatus[dataNumber.number] = attendanceStatus;
        //                 postData($scope.storeAttendence);
        //                 //console.error($scope.markedStatus);
        //                  angular.element(document.getElementById($scope.id)).removeAttr('class');
        // angular.element(document.getElementById($scope.id)).addClass(attendanceStatus);
        // }

    };

    function postData(storeAttendence) {
        console.log("called postData");
        $http({
            "method": "POST",
            "url": "http://192.168.0.171:3000/createEmployeeDayAttendance",
            "data": storeAttendence,
        }).then(function (data) {
            console.log(data);
            //$scope.attendance = data.data.attendanceData;
        })
    }

    function getTime(date) {
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
            return (hour - 12) + ":" + min + " PM";
        }

    }

});