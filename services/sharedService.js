angular.module("mainApp")
    .factory("SharedService", function ($q, $http) {
        return {
            getEmp: function () {
                var deferred = $q.defer();
                    httpPromise = $http.get("employee.json");
                httpPromise.then(function (response) {
                    deferred.resolve(response);

                    //console.log(response);

                }, function (error) {
                    console.error(error);
                });
                return deferred.promise;
            }

        };
    });