angular.module('mainApp').controller('ProfileCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
    $scope.portfolioId = $stateParams.portfolioId;
    //  console.log($scope.portfolioId);
    $scope.empdetails = {};
    $http.get('employee.json').then(function (data) {

        angular.forEach(data.data.employeeList, function (value, key) {
            // console.log(typeof $scope.portfolioId);
            if (value.engineerId == $scope.portfolioId) {
                //  console.log("id:"+value.engineerId);
                $scope.empdetails = value;
                //  console.log("value:"+value);
            }

        })
    });


}]);