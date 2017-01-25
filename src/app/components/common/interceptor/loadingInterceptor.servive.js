(function() {
    angular.module('myAppT').service('loadingInterceptor', ['$q', '$rootScope', 
    function ($q, $rootScope) {
        'use strict';
        var xhrCreations = 0;
        var xhrResolutions = 0;
     
        function isLoading() {
            return xhrResolutions < xhrCreations;
        }
     
        function updateStatus(url) {
            if(url){
                if(url.split("?")[1]!==undefined){
                    if(url.split("?")[1].split("=")[0]==="filter[customerName]"){
                        $rootScope.autoSuggestloading = isLoading();

                    }else{
                        $rootScope.loading = isLoading();
                    }
                } else{
                    $rootScope.loading = isLoading();
                }
            }else{
               $rootScope.loading = isLoading();
               $rootScope.autoSuggestloading = isLoading();
            }
            
        }
     
        return {
            request: function (config) {
                xhrCreations++;
                updateStatus(config.url);
                return config;
            },
            requestError: function (rejection) {
                xhrResolutions++;
                updateStatus();
                //$log.error('Request error:', rejection);
                return $q.reject(rejection);
            },
            response: function (response) {
                xhrResolutions++;
                updateStatus();
                return response;
            },
            responseError: function (rejection) {
                xhrResolutions++;
                updateStatus();
                //$log.error('Response error:', rejection);
                return $q.reject(rejection);
            }
        };
    }]);

})();