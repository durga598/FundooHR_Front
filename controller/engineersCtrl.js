angular.module('mainApp').controller('EngCtrl', function ($scope, $location, $stateParams, $state, $auth, SharedService) {
  $scope.empArr = {};

  //called SharedService to get emp data from local JSON
  SharedService.getEmp()
    .then(function (response) {
      $scope.empArr = response.data.employeeList;

      //console.log($scope.empArr);
    }, function (error) {
      console.error(error);
    });
});