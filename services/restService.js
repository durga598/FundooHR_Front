angular.module('mainApp').service('restService', restService);

function restService($http, $log, $q) {
    var baseUrl = "http://192.168.0.62:3000/";
    this.getRequest = function (path, config, query) {
            console.log("called");
            // console.log(path,query);
            var deferred = $q.defer();
            $http({
                    method: "GET",
                    url: baseUrl + path,
                    headers: config,
                    params: query
                }).then(function (data) {
                    deferred.resolve(data);
                }),
                function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                };
            return deferred.promise;
        }
        // this.getRequest = function(path, query){
        //     // console.log(path,query);
        //     var deferred = $q.defer();
        //     $http({
        //         method: "GET",
        //         url: baseUrl + path,
        //         params: query
        //     }).then(function (data){
        //         deferred.resolve(data);
        //     }), function(msg,code){
        //         deferred.reject(msg);
        //         $log.error(msg,code);
        //     };
        //     return deferred.promise;
        // }

    this.postRequest = function (path, config, query) {
        var deferred = $q.defer();
        $http({
                method: "POST",
                url: baseUrl + path,
                headers: config,
                data: query
            }).then(function (data) {
                deferred.resolve(data);
            }),
            function (msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            };
        return deferred.promise;
    }
}