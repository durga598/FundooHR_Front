angular.module('mainApp').controller('LoginCtrl', function ($scope, $state, $auth, $rootScope) {

  var config = {
    method: 'POST',
    url: 'http://192.168.0.17:3000/login'
  };
  $scope.emailFormat = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  $scope.passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  $scope.login = function () {
    localStorage.setItem("email", $scope.user.emailId);
    $rootScope.email = localStorage.getItem("email");
    $rootScope.name = $rootScope.email.split("@")[0];
    console.log($rootScope.email);
    $auth.login($scope.user, config)
      .then(function (data) {
        console.log(data);
        $state.go('home.DashBoard');
        // $location.path('/');
      })
      .catch(function (error) {
        console.log(error.data.message, error.status);
        $scope.error = "Incorrect email/password !";
        // toastr.error(error.data.message, error.status);
      });
  };

});