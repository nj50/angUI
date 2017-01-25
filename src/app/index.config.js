(function() {
    'use strict';

    angular
        .module('myAppT')
        .config(config);

    /** @ngInject */
    function config($logProvider,$httpProvider) {
        // Enable log
        $logProvider.debugEnabled(true);
        $httpProvider.interceptors.push('loadingInterceptor');
        // Set options third-party lib
       // toastr.options.timeOut = 3000;
      //  toastr.options.positionClass = 'toast-top-right';
      //  toastr.options.preventDuplicates = true;
      //  toastr.options.progressBar = true;
    }

})();