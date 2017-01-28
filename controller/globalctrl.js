/**
 * @fileName:globalctrl.js
 * @createBy:Durga
 * @module ng-app: mainApp
 * @controller : GlobalCtrl to control body class name
 */
angular.module('mainApp').controller('GlobalCtrl', function($scope) {
    // Event listener for state change.
    $scope.$on('$stateChangeStart', function(event, toState, toParams) {
        $scope.bodyClass = toState.name+'-page';
    });
});