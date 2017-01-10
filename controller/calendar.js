angular.module('mainApp').controller("AttendenceCtrl", function ($scope, $http, $rootScope, $mdDialog) {

    console.log("calendar...");
    //Testing Directive Data of calender//
    //**************Start***************//
    // $scope.inTime="";
    // $scope.outTime="";
    // $scope.save = function(){
    //  storeAttendence ={};
    //  item ["attendanceStatus"] = id;
    //     item ["markedStatus"] = email;
    //     item ["punchIn"] = email;
    //     item ["punchOut"] = email;
    //     item ["email"] = email;

    //     jsonObj.push(item);
    //     console.log("called save");
    //     console.log($scope.outTime);
    // }
    // $scope.close = function () {
    //     console.log("called close");
    //     $mdDialog.hide();
    // }


    //**************End***************//


    $rootScope.status = '  ';
    $rootScope.customFullscreen = false;

    //moment object to get date
    $scope.day = moment();
    $rootScope.attendanceData = [];
    $rootScope.attendance = [];
    // var promise = $http.get("assets/attendance.json").then(function (response) {
    // 	$rootScope.attendance = response.data[0];
    // 	$scope.attendance = response.data[0];
    // 	// console.log(response.data[0]);
    // 	$rootScope.attendanceData = Object.keys(response.data[0]);
    // 	//   console.log(attendance[1].attendanceStatus);
    // 	console.log('called1');
    // 	//   console.log($rootScope.attendance);
    // });
    // $scope.timestamp = $scope.selected.unix();
    $scope.$watch("selected", function (old, newData) {
        //console.log(old, newData)
    });
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
        // console.log($scope.timestamp);

    // $scope.attendance=[];
    // $http.get("assets/attendance.json").then(function (response) {
    //     $scope.attendance = response.data[0];
    // });
    // $scope.isAttend = function (id) {
    // 		// console.log(attendanceData.length);
    // 		if ($rootScope.attendanceData.length != 0 && id.number !== "") {
    // 			// $http.get("assets/attendance.json").then(function(response) {
    // 			// attendanceData = Object.keys(response.data[0]);
    // 			// console.log("calledatt");
    // 			return $rootScope.attendanceData.indexOf("" + id.number) >= 0;
    // 			// });
    // 		}

    // 	}
    // 			   $scope.isPresent = function(id) {

    // 					   // console.log($rootScope.attendance );
    // // return true;
    // 				   if($rootScope.attendance[id]){
    // 					// $http.get("assets/attendance.json").then(function(response) {
    // 					 // console.log("calledpre");
    //          		 	// attendanceData = Object.keys(response.data[0]);
    // 				  	return $rootScope.attendance[id].attendanceStatus === "Present" ;
    //     				// });
    // 					}
    // 			   }
    // 			   $scope.isLeave = function(id) {
    // // return true;
    // 				   if($rootScope.attendance[id]){
    // 					// $http.get("assets/attendance.json").then(function(response) {
    //          		 	// attendanceData = Object.keys(response.data[0]);
    // 				  	return $rootScope.attendance[id].attendanceStatus === "Leave" ;
    //     				// });
    // 					}
    // 			   }
    // 			   $scope.isCompLeave = function(id) {

    // 				   if($rootScope.attendance[id]){
    // 					// $http.get("assets/attendance.json").then(function(response) {
    //          		 	// attendanceData = Object.keys(response.data[0]);
    // 				  	return $rootScope.attendance[id].attendanceStatus === "CompLeave" ;
    //     				// });
    // 					}
    // 			   }

    // $rootScope.markedStatus = "";
                $scope.markedStatus={};

    $scope.checkAttend = function (day) {
        console.log("checkattend")
                var todayDate = moment();
            
                    //console.log(todayDate.isBefore(day.date), day.date, todayDate);

                if (todayDate.isBefore(day.date)) {
                    // console.log("upcoming");
                    day.enable = false;
                    return "upcoming";
                } else if (day.isCurrentMonth) {
                    if (day.status.markedStatus === "true") {
                        $scope.markedStatus[day.number] = day.status.attendanceStatus;
                        return "";
                    } else {
                        $scope.markedStatus[day.number] = "unmark";
                        return "";
                    }
                }
                 console.log($scope.markedStatus);
            };
    $scope.someD = function (data, attendanceStatus) {
        console.log($scope.markedStatus);
        var dataNumber = JSON.parse(data);
        console.log('data ', dataNumber.number);
        /*if (attendanceStatus === "Present") {
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
                        item = {};
                        storeAttendence = {};
                        storeAttendence["attendanceStatus"] = attendanceStatus;
                        storeAttendence["markedStatus"] = "true";
                        storeAttendence["punchIn"] = getTime($scope.punchIn);
                        storeAttendence["punchOut"] = $scope.punchOut;
                        storeAttendence["reason"] = "";

                        item[dataNumber.number] = storeAttendence;

                        console.log(storeAttendence, item);
                        $scope.markedStatus[dataNumber.number] = attendanceStatus;
                        
                        $scope.close();

                    }
                    $scope.close = function () {
                        $mdDialog.hide();
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
                        console.log("called save");
                        item = {};
                        storeAttendence = {};
                        storeAttendence["attendanceStatus"] = attendanceStatus;
                        storeAttendence["markedStatus"] = "true";
                        storeAttendence["punchIn"] = "";
                        storeAttendence["punchOut"] = "";
                        storeAttendence["reason"] = $scope.reason;
                        item[data.number] = storeAttendence;

                        console.error($scope.markedStatus);
                        console.log(storeAttendence, item);
                         $scope.markedStatus[dataNumber.number] = attendanceStatus;

                        console.error($scope.markedStatus);
                        $scope.close();
                    }
                    $scope.close = function () {
                        $mdDialog.hide();
                    }
                },
                disableParentScroll: false,
            });
        }*/

    };

    function getTime(date) {
        var time = "",
            hour = date.getHours(),
            min = date.getMinutes();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (hour < 12) {
            var ampm = "AM";
            time = hour + ":" + min + " " + ampm;
            return time;
        } else if (hour == 12) {
            var ampm = "PM";
            time = hour + ":" + min + " " + ampm;
            return time;
        } else {
            var ampm = "PM";
            time = (hour - 12) + ":" + min + " " + ampm;
            return time;
        }

    }

});