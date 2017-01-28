/**
 * @fileName:engineersCtrl.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @controller : EngCtrl to control engineers data
 */

angular.module('mainApp').controller('EngCtrl', function ($scope, $location, $stateParams, $state, $auth, restService) {
  /**
   * @var empArr to hold all employeeList, iterate to show all cards
   */
  $scope.showloader = true;
  $scope.empArr = {};
  var token = localStorage.getItem('satellizer_token');
   var config = {
        'x-token': token
    };
    var query={}
  var promise = restService.getRequest('searchEmployeeByName', config,query);
  promise.then(function (data) {
    $scope.showloader = false;
    $scope.empArr = data.data.employeeList;
    console.log($scope.empArr);
    // console.log(data.data.employeeList);
  });
  // console.log(angular.equals($scope.empArr, {}));
  
});