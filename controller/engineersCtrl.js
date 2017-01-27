angular.module('mainApp').controller('EngCtrl', function ($scope, $location, $stateParams, $state, $auth, restService) {
  $scope.empArr = {};
  var token = localStorage.getItem('satellizer_token');
  var query = {
    token: token,

  }
  console.log(angular.equals($scope.empArr, {}));
  var promise = restService.getRequest('searchEmployeeByName', query);
  promise.then(function (data) {
    
    $scope.empArr = data.data.employeeList;
    // console.log($scope.empArr);
    // console.log(data.data.employeeList);
  });
  // console.log(angular.equals($scope.empArr, {}));
  
});