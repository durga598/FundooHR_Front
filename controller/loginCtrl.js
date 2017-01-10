angular.module('mainApp').controller('LoginCtrl', function ($scope, $state,$auth) {

  var config = {method: 'POST',url: 'http://192.168.0.171:3000/login'};
  $scope.login = function () {
    $auth.login($scope.user,config)
      .then(function (data) {
         console.log("You have successfully signed in!")
         $state.go('home');
        // $location.path('/');
      })
      .catch(function (error) {
        console.log(error.data.message, error.status);
        $scope.error = "Incorrect email/password !";
        // toastr.error(error.data.message, error.status);
      });
  };

});
