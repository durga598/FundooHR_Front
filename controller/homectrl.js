/**
 * @fileName:homectrl.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @controller : HomeCtrl to control home
 */
angular.module('mainApp').controller('HomeCtrl', function ($scope, $location, $stateParams, $state, $auth,$rootScope) {
  $scope.isAuth = function () {
    return $auth.isAuthenticated();
  };
  $scope.today = new Date();
  $scope.$state = $state;
  $rootScope.email = localStorage.getItem("email");
$rootScope.name = $rootScope.email.split("@")[0];
  // $state.go('home.DashBoard')
});
