var mainApp = angular.module("mainApp", ['ui.router', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'satellizer','toastr','xeditable','material.svgAssetsCache', 'ngSanitize']);
mainApp.config( function ($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {
    var skipIfLoggedIn = ['$q', '$auth', function ($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function ($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }
        return deferred.promise;
    }];


    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl',
            // resolve: {
            //     skipIfLoggedIn: skipIfLoggedIn
            // }
        })
        .state('logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutCtrl'
        })
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl',
            //   resolve: {
            //           loginRequired: loginRequired
            //         }
        })
        .state('home.DashBoard',{
            url:'dash',
            templateUrl:'templates/dash.html',
            controller:'DashCtrl',
            //   resolve: {
            //           loginRequired: loginRequired
            //         }
        })
        .state('home.Engineers',{
            url:'engineers',
            templateUrl: 'templates/engineers.html',
            controller: 'EngCtrl',
            //   resolve: {
            //           loginRequired: loginRequired
            //         }
        })

         .state('home.Profile',{
            url:'engineers/profile/:portfolioId',
            templateUrl: 'templates/profile.html',
            controller:'ProfileCtrl',
            //   resolve:{
            //           loginRequired: loginRequired
            //         }
        })
        .state('home.Profile.Attendence',{
            url:'/attendence/',
            templateUrl:'templates/calendar.html'
            // controller:'AttendenceCtrl',
            //   resolve:{
            //           loginRequired: loginRequired
            //         }
        })
        .state('home.Profile.Personal',{
            url:'/personal/',
            templateUrl:'templates/personal.html',
            controller:'PersonalCtrl',
            //   resolve:{
            //           loginRequired: loginRequired
            //         }
        });


});


mainApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});


