angular.module('mainApp').controller('HomeCtrl', function ($scope, $location, $stateParams, $state, $auth) {
  $scope.isAuth = function () {
    return $auth.isAuthenticated();
  };
  $scope.today = new Date();
  $scope.name = "Durga";
  $scope.$state = $state;
  console.log($scope.$state.includes('home.DashBoard'));
  // $state.go('home.DashBoard')
});
