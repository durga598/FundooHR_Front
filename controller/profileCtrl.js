angular.module('mainApp').controller('ProfileCtrl', function ($scope, $http, $rootScope, $stateParams, $state, restService) {

    $scope.portfolioId = $stateParams.portfolioId;
    $rootScope.profileId = $scope.portfolioId;
    $rootScope.empdetails = {};

    var token = localStorage.getItem('satellizer_token');
    var query = {
        token: token,

    }
    var promise = restService.getRequest('searchEmployeeByName', query);
    promise.then(function (data) {
        angular.forEach(data.data.employeeList, function (value, key) {
            if (value.engineerId == $scope.portfolioId) {
                $rootScope.empdetails = value;
            }

        });
        // console.log($scope.empdetails);
    });


});