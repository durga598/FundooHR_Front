angular.module('mainApp').factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass@123';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  });