(function() {
    'use strict';

    angular
        .module('myAppT')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();