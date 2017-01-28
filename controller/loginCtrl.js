/**
 * @fileName:loginCtrl.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @controller : LoginCtrl to control login
 */
angular.module('mainApp').controller('LoginCtrl', function ($scope, $state, $auth, $rootScope) {

  var config = {
    method: 'POST',
    url: 'http://192.168.0.62:3000/login'
  };

  /**
   * emailFormat:pattern for email validetion
   * passwordFormat: pattern for password validetion
   */
  $scope.emailFormat = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  $scope.passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  /**
   * @function login : login using satellizer
   */
  $scope.login = function () {
    localStorage.setItem("email", $scope.user.emailId);
    $rootScope.email = localStorage.getItem("email");
    $rootScope.name = $rootScope.email.split("@")[0];

    $auth.login($scope.user, config)
      .then(function (data) {
        $state.go('home.DashBoard');
        // $location.path('/');
      })
      .catch(function (error) {
        console.log(error.data.message, error.status);
        $scope.error = "Incorrect email/password !";
      });
  };

});