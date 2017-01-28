/**
 * @fileName:dashBoardCtrl.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @controller : DashCtrl to control dashboard
 */
angular.module('mainApp').controller('DashCtrl', function ($scope, $location, $stateParams, $state, $auth, restService) {
    var timeStamp = new Date().getTime();
    var token = localStorage.getItem('satellizer_token');
    var query = {
        timeStamp: timeStamp
    }
    var config = {
        'x-token': token
    };
    var promise = restService.getRequest('readDashboardData', config, query);
    promise.then(function (data) {
        console.log(data);
    });
});