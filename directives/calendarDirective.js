/**
 * @fileName:calendarDirective.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @directive : calendar to control calendar
 */
angular.module('mainApp').directive("calendar", function ($rootScope, $http, $mdDialog) {
    return {
        restrict: "E",
        templateUrl: "templates/attendence.html",
        scope: {
            selected: "=",
            data: "="
        },
        link: function (scope) {
            //**For Loader **//
            scope.loaderEnable = true;

            scope.readData(Date.now());

            //** change calendar data everytime according to attendance status**//
            scope.$watch("attendance", function (data, newData) {
                //**Loads for first time**//
                if (scope.called === undefined || scope.called === 3) {
                    scope.selected = _removeTime(scope.selected || moment());
                    scope.month = scope.selected.clone();
                    var start = scope.selected.clone();
                    start.date(1);
                    _removeTime(start.day(0));
                    _buildMonth(scope, start, scope.month);
                }
                //**Loads when next function called for next month**//                
                else if (scope.called === 0) {
                    var next = scope.month.clone();

                    _removeTime(next.month(next.month() + 1).date(1));
                    scope.month.month(scope.month.month() + 1);
                    _buildMonth(scope, next, scope.month);
                }
                //**Loads when previous function called for previous month**//
                else if (scope.called === 1) {
                    var previous = scope.month.clone();
                    // console.log(scope.month.month());
                    _removeTime(previous.month(previous.month() - 1).date(1));
                    scope.month.month(scope.month.month() - 1);
                    _buildMonth(scope, previous, scope.month);
                }


            });

            //show dialog according to attendance status
            scope.showAlert = function (ev, day) {
if(day.status.attendanceStatus != undefined){
                //show dialog for attendance status Present
                $mdDialog.show({
                    controller: function (scope) {
                        if (day.status.attendanceStatus === "Present") {
                            scope.showPopUp = true;
                            scope.punchIn = day.status.punchIn;
                            scope.punchOut = day.status.punchOut;
                        } else {
                            scope.showPopUp = false;
                            scope.reason = day.status.reason;
                        }

                        scope.cancel = function () {
                            $mdDialog.cancel();
                        }
                    },
                    templateUrl: 'partials/presentPopUp.html',
                    parent: angular.element(document.querySelector('#popupContainer')),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    disableParentScroll: false

                })
}
            };

            // scope.select = function (day) {
            // };

            //Function to show next month
            scope.next = function () {
                console.log(scope.timeStampData);
                scope.loaderEnable = true;
                scope.called = 0;
                var next = scope.month.clone();
                scope.readData(next.month(next.month() + 1).date(1).unix() * 1000);
            };

            //Function to show previous month
            scope.previous = function () {
                console.log(scope.timeStampData);
                scope.loaderEnable = true;
                scope.called = 1;
                var previous = scope.month.clone();
                scope.readData(previous.month(previous.month() - 1).date(1).unix() * 1000);
            };

            scope.reload = function () {
                scope.called = 3;
                scope.readData(scope.timeStampData);
            }
        },
        controller: "AttendenceCtrl"

    };

    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    //Build month with array of weeks
    function _buildMonth(scope, start, month) {
        console.log(month);
        console.log(start);
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
        if (scope.attendance !== undefined) {
            for (var i = 0; i < 7; i++) {
                if (date.month() === month.month() && (scope.attendance[date.date()] !== undefined)) {
                    if (scope.attendance[date.date()] !== undefined)
                        days.push({
                            name: date.format("dd").substring(0, 1),
                            number: date.date(),
                            isCurrentMonth: date.month() === month.month(),
                            isToday: date.isSame(new Date(), "day"),
                            timeStamp: date.unix(),
                            date: date,
                            enable: true,
                            status: scope.attendance[date.date()]
                        });
                } else if (date.month() === month.month())
                    days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        timeStamp: date.unix(),
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
        }
        return days;
    }

});