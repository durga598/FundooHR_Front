angular.module('mainApp').service('restService', restService);
function restService($http,$log,$q){
    var baseUrl= "http://192.168.0.9:3000/";
    this.getRequest = function(path,query){
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: baseUrl + path,
            params: query
        }).then(function (data){
            deferred.resolve(data);
        }), function(msg,code){
            deferred.reject(msg);
            $log.error(msg,code);
        };
        return deferred.promise;
    }

    this.postRequest = function(path,query){
        var deferred = $q.defer();
        $http({
            method:"POST",
             url: baseUrl + path,
            data: query
        }).then(function (data){
            deferred.resolve(data);
        }), function(msg,code){
            deferred.reject(msg);
            $log.error(msg,code);
        };
        return deferred.promise;
    }
}