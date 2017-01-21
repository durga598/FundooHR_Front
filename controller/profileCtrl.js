angular.module('mainApp').controller('ProfileCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
    $scope.portfolioId = $stateParams.portfolioId;
    $scope.empdetails = {};
    $http.get('employee.json').then(function (data) {

        angular.forEach(data.data.employeeList, function (value, key) {
            if (value.engineerId == $scope.portfolioId) {
                $scope.empdetails = value;
            }

        })
    });


}]);