angular.module('mainApp').controller('PersonalCtrl', function ($scope, $filter, $q, $http, $timeout)
  {
 
 var itemsPendingSave = [];
 
 $scope.users =[{
            "engineerId": "427188EI",
            "emailId": "arjunthakur@bridgelabz.com",
            "mobile": "9807654321",
            "dateOfBirth": "20 sept 1993",
            "fatherName": "Senior James bond",
            "fatherMobile": "98000007",
            "occupation": "Teacher",
            "annualSalary": "0.007",
            "mumbaiAddress": "Plot no57,sector 12,vashi, Pin: 400703",
            "premanentAddress": "S/O Venkateshappa P.R, C/O Suryanarayana Rao B.P, #30/1 Hort Park Road, S.S Puram 15 th Cross,TUMKUR-572102"
 }]; 

 //console.log($scope.users);
    
  $scope.cancelChanges = function(){
    angular.forEach(itemsPendingSave, function(user){
      var index = $scope.users.indexOf(user);
      $scope.removeUser(index);
    });
    itemsPendingSave = [];
    $scope.tableform.$cancel();
  };
  


  $scope.saveTable = function() {
    //$scope.users already updated
      
   // console.log("tableform.onaftersave");
    var results = [];
    itemsPendingSave = [];
    angular.forEach($scope.users, function(user) {
     // results.push($http.post('/saveUser', user));
    })
    return $q.all(results);
  };
    
  // add user
  $scope.addUser = function() {
    var newUser = {
     engineerId: '',
     emailId: '',
     mobile:'',
     dateOfBirth:'',
     fatherMobile:'',
     occupation:'',
     annualSalary:'',
     mumbaiAddress:'',
     premanentAddress:'',
    };
    $scope.users.push(newUser);
    itemsPendingSave.push(newUser);
    
    if (!$scope.tableform.$visible) {
      $scope.tableform.$show();
    }    
    // Hack to be able to add a record and have focus set to the new row
    $timeout(function(){
       newUser.isFocused = true;
    }, 0);
  };

 // console.log($scope.addUser);
});
