/**
 * @fileName:logoutctrl.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @controller : LogoutCtrl to control logout
 */
angular.module('mainApp')
  .controller('LogoutCtrl', function($location, $auth,$state) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        $state.go('login');
      }).catch(function (error) {
        console.log(error.data.message, error.status);
      });
  });
