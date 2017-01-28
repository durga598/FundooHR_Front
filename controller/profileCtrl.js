/**
 * @fileName:profileCtrl.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @controller : ProfileCtrl to control profile data
 */
angular.module('mainApp').controller('ProfileCtrl', function ($scope, $http, $rootScope, $stateParams, $state, restService) {

    /**
     * @var portfolioId : store engineer Id
     * @var empdetails : stores data according to engineerId
     */
    $scope.portfolioId = $stateParams.portfolioId;
    $rootScope.profileId = $scope.portfolioId;
    $rootScope.empdetails = {};

    var token = localStorage.getItem('satellizer_token');
    var query = {
        engineerId : $scope.portfolioId
    }
    var config = {
        'x-token': token
    };
    var promise = restService.getRequest('readEmployeeProfileData',config, query);
    promise.then(function (data) {
        $rootScope.empdetails = data.data.employeeData;
    });
});