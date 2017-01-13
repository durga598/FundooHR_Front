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

            scope.inc = 0;
            scope.$watch("attendance", function (data, newData) {
                console.log("called link" + scope.inc++);

                if (scope.called === undefined) {
                    scope.selected = _removeTime(scope.selected || moment());
                    scope.month = scope.selected.clone();
                    var start = scope.selected.clone();
                    start.date(1);
                    _removeTime(start.day(0));
                    _buildMonth(scope, start, scope.month);

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
                

                if (day.status.attendanceStatus === "Present") {
                    // .htmlContent('In Time: ' + day.status.punchIn + '<br>Out Time:' + day.status.punchOut+'')
                    // $mdDialog.show(
                    //     $mdDialog.alert()
                    //     .parent(angular.element(document.querySelector('#popupContainer')))
                    //     .clickOutsideToClose(true)
                    //     .htmlContent('In Time: ' + day.status.punchIn + '<br>Out Time:' + day.status.punchOut+'')

                    //     .ariaLabel('Alert Dialog Demo')
                    //     .ok('OK')
                    //     .targetEvent(ev)
                    //     .disableParentScroll(false)
                    // );
                    $mdDialog.show({
                            controller: function(scope){
                                console.log("Called ",day);
                                scope.punchIn = day.status.punchIn;
                                scope.punchOut = day.status.punchOut;
                                scope.cancel = function(){
                                   $mdDialog.cancel(); 
                                   
                                }
                            },
                            templateUrl: 'partials/presentPopUp.html',
                            parent: angular.element(document.querySelector('#popupContainer')),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            disableParentScroll: false
                            
                        })
                        .then(function (answer) {
                            scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            scope.status = 'You cancelled the dialog.';
                        });

                } else if (day.status.attendanceStatus === "Leave" || day.status.attendanceStatus === "CompLeave") {
                    // $mdDialog.show(
                    //     $mdDialog.alert()
                    //     .parent(angular.element(document.querySelector('#popupContainer')))
                    //     .clickOutsideToClose(true)
                    //     .htmlContent('sdfsdf<span class="glyphicons glyphicons-remove"></span>')
                    //     .ariaLabel('Alert Dialog Demo')
                    //     .ok('OK')
                    //     .targetEvent(ev)
                    //     .disableParentScroll(false)
                    // );
                    $mdDialog.show({
                            controller: function(scope){
                                console.log("Called ",day);
                                scope.reason = day.status.reason;
                                scope.cancel = function(){
                                    console.log("called");
                                   $mdDialog.cancel(); 
                                }
                            },
                            templateUrl: 'partials/absentPopUp.html',
                            parent: angular.element(document.querySelector('#popupContainer')),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            disableParentScroll: false
                            
                        })
                        .then(function (answer) {
                            // $scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            // $scope.status = 'You cancelled the dialog.';
                        });
                }
            };




            scope.select = function (day) {


            };




            //Function to show next month
            scope.next = function () {
                scope.called = 0;
                console.log("1");
                var next = scope.month.clone();

                scope.readData(next.month(next.month() + 1).date(1).unix() * 1000);


            };

            //Function to show previous month
            scope.previous = function () {
                scope.called = 1;
                console.log("1");
                var previous = scope.month.clone();
                scope.readData(previous.month(previous.month() - 1).date(1).unix() * 1000);
                console.log("2");
            };
        },
        controller: "AttendenceCtrl"

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

        }


    }

    //Build week with array of days
    function _buildWeek(date, month, scope) {

        var days = [];
        for (var i = 0; i < 7; i++) {


            if (date.month() === month.month() && (scope.attendance[date.date()] !== undefined)) {
                if (scope.attendance[date.date()] !== undefined)
                    days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        isToday: date.isSame(new Date(), "day"),
                        timeStamp:date.unix(),
                        date: date,
                        enable: true,
                        status: scope.attendance[date.date()]
                    });
            } else if (date.month() === month.month())
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    timeStamp:date.unix(),
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