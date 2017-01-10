angular.module('mainApp').directive("calendar", function ($rootScope, $http, $mdDialog) {
    return {
        restrict: "E",
        templateUrl: "templates/attendence.html",
        scope: {
            selected: "=",
            data: "="
        },
        link: function (scope) {
            scope.readData(Date.now());
            // scope.markedStatus={};

            //Data from directive attendance

            scope.$watch("attendance", function (data, newData) {
                if (scope.called === undefined) {

                    scope.selected = _removeTime(scope.selected || moment());
                    // console.log(scope);

                    scope.month = scope.selected.clone();
                    // console.log(scope.selected);

                    var start = scope.selected.clone();
                    // console.log(start);
                    start.date(1);
                    // console.log(scope.month);
                    // console.log(start.getTime());
                    //getting staring day in month
                    _removeTime(start.day(0));
                    // console.log(start);

                    _buildMonth(scope, start, scope.month);
                    // console.log(scope.weeks);
                } else if (scope.called === 0) {
                    var next = scope.month.clone();
                    _removeTime(next.month(next.month() + 1).date(1));
                    scope.month.month(scope.month.month() + 1);
                    _buildMonth(scope, next, scope.month);
                } else if (scope.called === 1) {
                    var previous = scope.month.clone();
                    _removeTime(previous.month(previous.month() - 1).date(1));
                    scope.month.month(scope.month.month() - 1);
                    _buildMonth(scope, previous, scope.month);
                }


            });

            //show dialog according to attendance status
            scope.showAlert = function (ev, day) {
                console.log("Called");
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                if (day.status.attendanceStatus === "Present") {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .htmlContent('In Time: ' + day.status.punchIn + '<br>Out Time:' + day.status.punchOut)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                        .targetEvent(ev)
                        .disableParentScroll(false)
                    );

                } else if (day.status.attendanceStatus === "Leave" || day.status.attendanceStatus === "CompLeave") {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .htmlContent('Reason: ' + day.status.reason)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                        .targetEvent(ev)
                        .disableParentScroll(false)
                    );
                }
            };

            //getting week day(sunday)
            // console.log(scope.selected);
            // Promise.all([promise]).then(function(){
            // 	console.log("promise");
            // });


            scope.select = function (day) {
                // console.log(day.number + " select");

            };


            // scope.checkAttend = function (day) {
            //     var todayDate = moment();
            
            //         //console.log(todayDate.isBefore(day.date), day.date, todayDate);

            //     if (todayDate.isBefore(day.date)) {
            //         // console.log("upcoming");
            //         day.enable = false;
            //         return "upcoming";
            //     } else if (day.isCurrentMonth) {
            //         if (day.status.markedStatus === "true") {
            //             scope.markedStatus[day.number] = day.status.attendanceStatus;
            //             return "";
            //         } else {
            //             scope.markedStatus[day.number] = "unmark";
            //             return "";
            //         }
            //     }
            //     // console.log(scope.markedStatus);
            // };

            //Function to show next month
            scope.next = function () {
                scope.called = 0;
                console.log("1");
                var next = scope.month.clone();
                //_removeTime(next.month(next.month() + 1).date(1));
                //scope.month.month(scope.month.month() + 1);
                //_buildMonth(scope, next, scope.month);
                scope.readData(next.month(next.month() + 1).date(1).unix() * 1000);
                // scope.readData(timestamp);


            };

            //Function to show previous month
            scope.previous = function () {
                scope.called = 1;
                console.log("1");
                var previous = scope.month.clone();
                // _removeTime(previous.month(previous.month() - 1).date(1));
                // scope.month.month(scope.month.month() - 1);
                // _buildMonth(scope, previous, scope.month);
                // console.log(scope.weeks[1].days[0].date.unix());
                scope.readData(previous.month(previous.month() - 1).date(1).unix() * 1000);
                console.log("2");
            };
        },
        controller: "AttendenceCtrl"//function ($scope, $http, $rootScope) {
            // // $scope.timestamp = $scope.selected.unix();
            // $scope.$watch("selected", function (old, newData) {
            //     console.log(old, newData)
            // });
            // $scope.readData = function (timestamp) {
            //         console.log("read");

            //         // console.log($scope.selected.unix());
            //         $http({
            //             "method": "GET",
            //             "url": "http://192.168.0.171:3000/readEmployeeMonthlyAttendance?token=f12sd1fd2sf1&engineerId=427188EI&timeStamp=" + timestamp
            //         }).then(function (data) {
            //             console.log(data);
            //             $scope.attendance = data.data.attendanceData;
            //         })
            //     }
            //     // console.log($scope.timestamp);

            // // $scope.attendance=[];
            // // $http.get("assets/attendance.json").then(function (response) {
            // //     $scope.attendance = response.data[0];
            // // });
            // // $scope.isAttend = function (id) {
            // // 		// console.log(attendanceData.length);
            // // 		if ($rootScope.attendanceData.length != 0 && id.number !== "") {
            // // 			// $http.get("assets/attendance.json").then(function(response) {
            // // 			// attendanceData = Object.keys(response.data[0]);
            // // 			// console.log("calledatt");
            // // 			return $rootScope.attendanceData.indexOf("" + id.number) >= 0;
            // // 			// });
            // // 		}

            // // 	}
            // // 			   $scope.isPresent = function(id) {

            // // 					   // console.log($rootScope.attendance );
            // // // return true;
            // // 				   if($rootScope.attendance[id]){
            // // 					// $http.get("assets/attendance.json").then(function(response) {
            // // 					 // console.log("calledpre");
            // //          		 	// attendanceData = Object.keys(response.data[0]);
            // // 				  	return $rootScope.attendance[id].attendanceStatus === "Present" ;
            // //     				// });
            // // 					}
            // // 			   }
            // // 			   $scope.isLeave = function(id) {
            // // // return true;
            // // 				   if($rootScope.attendance[id]){
            // // 					// $http.get("assets/attendance.json").then(function(response) {
            // //          		 	// attendanceData = Object.keys(response.data[0]);
            // // 				  	return $rootScope.attendance[id].attendanceStatus === "Leave" ;
            // //     				// });
            // // 					}
            // // 			   }
            // // 			   $scope.isCompLeave = function(id) {

            // // 				   if($rootScope.attendance[id]){
            // // 					// $http.get("assets/attendance.json").then(function(response) {
            // //          		 	// attendanceData = Object.keys(response.data[0]);
            // // 				  	return $rootScope.attendance[id].attendanceStatus === "CompLeave" ;
            // //     				// });
            // // 					}
            // // 			   }

            // $scope.markStatus = "";
            // $scope.someD = function (data, attendanceStatus) {
            //     console.log(data, attendanceStatus);
            //     var dataNumber = JSON.parse(data);
            //     console.log('data ', dataNumber.number);
            //     if (attendanceStatus === "Present") {
            //         $mdDialog.show({
            //             parent: angular.element(document.querySelector('#popupContainer')),
            //             templateUrl: "templates/prompt.html",
            //             clickOutsideToClose: false,
            //             scope: $scope,
            //             preserveScope: true,
            //             disableParentScroll: false,
            //             controller: function ($scope) {
            //                 $scope.save = function () {
            //                     console.log("called save");
            //                     item = {};
            //                     storeAttendence = {};
            //                     storeAttendence["attendanceStatus"] = attendanceStatus;
            //                     storeAttendence["markedStatus"] = "true";
            //                     storeAttendence["punchIn"] = getTime($scope.punchIn);
            //                     storeAttendence["punchOut"] = $scope.punchOut;
            //                     storeAttendence["reason"] = "";

            //                     item[dataNumber.number] = storeAttendence;

            //                     console.log(storeAttendence, item);
            //                     $rootScope.markedStatus = attendanceStatus;
            //                     $scope.close();

            //                 }
            //                 $scope.close = function () {
            //                     $mdDialog.hide();
            //                 }
            //             },
            //         });
            //     } else if (attendanceStatus === "Leave" || attendanceStatus === "CompLeave") {
            //         $mdDialog.show({
            //             parent: angular.element(document.querySelector('#popupContainer')),
            //             templateUrl: "templates/prompt1.html",
            //             clickOutsideToClose: false,
            //             scope: $scope,
            //             preserveScope: true,
            //             controller: function ($scope) {
            //                 $scope.save = function () {
            //                     console.log("called save");
            //                     item = {};
            //                     storeAttendence = {};
            //                     storeAttendence["attendanceStatus"] = attendanceStatus;
            //                     storeAttendence["markedStatus"] = "true";
            //                     storeAttendence["punchIn"] = "";
            //                     storeAttendence["punchOut"] = "";
            //                     storeAttendence["reason"] = $scope.reason;
            //                     item[data.number] = storeAttendence;

            //                     console.log(storeAttendence, item);
            //                     $rootScope.markedStatus = attendanceStatus;
            //                     $scope.close();
            //                 }
            //                 $scope.close = function () {
            //                     $mdDialog.hide();
            //                 }
            //             },
            //             disableParentScroll: false,
            //         });
            //     }

            // };


        // }
    };

    

    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    //Build month with array of weeks
    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false,
            date = start.clone(),
            monthIndex = date.month(),
            count = 0;
        while (!done) {
            scope.weeks.push({
                days: _buildWeek(date.clone(), month, scope)
            });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
            // console.log(monthIndex);
        }

        // console.log(scope.weeks);
    }

    //Build week with array of days
    function _buildWeek(date, month, scope) {

        var days = [];
        for (var i = 0; i < 7; i++) {
            // console.log(scope.attendance[date.date()]);

            if (date.month() === month.month() && (scope.attendance[date.date()] !== undefined)) {
                if (scope.attendance[date.date()] !== undefined)
                    days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        isToday: date.isSame(new Date(), "day"),
                        date: date,
                        enable: true,
                        status: scope.attendance[date.date()]
                    });
            } else if (date.month() === month.month())
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date,
                    enable: true,
                    status: ''

                });
            else
                days.push({});

            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }

});