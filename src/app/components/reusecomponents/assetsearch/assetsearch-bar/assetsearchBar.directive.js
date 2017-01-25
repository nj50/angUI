'use strict';

angular
    .module('myAppT')
    .directive('assetSearch', assetSearch);

function assetSearch() {
    var directive = {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/reusecomponents/assetsearch/assetsearch-bar/assetsearchBar.html',
        controller: 'assetSearchController',
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;  
}








