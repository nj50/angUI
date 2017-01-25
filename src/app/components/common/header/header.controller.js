'use strict';
angular
    .module('myAppT')
    .controller('headerController', headerController);
headerController.$inject = ['$state','session','sharedService','$stateParams'];

function headerController($state,session,sharedService,$stateParams) {
	'use strict';
    var vm = this; 
    	vm.userType = session.getRole();
    	
        vm.activeLink = 'activeLink';
        
        vm.switchFlag = session.switch;
   
        if(vm.userType === 'buyer'){
          vm.newRole_DisplayText = 'Manager';
          vm.linksList =[
            {"LinkTitle":"B1","LinkState":"root.dashboard.Gridview"},
            {"LinkTitle":"B2","LinkState":""}
          ];
          // $scope.$watch(angular.bind(this, function () {
          //     return this.cartItemCount;
          //   }), function (newVal) {
          //     vm.linksList[1].LinkTitle = "My Cart ("+newVal+")";
          // });
        }
      
        if(vm.userType === 'manager'){
        	vm.linksList =[
	        	{"LinkTitle":"M1","LinkState":"","LinkStateNext":""},
	        	{"LinkTitle":"M2","LinkState":"root.dashboard.Gridview","LinkStateNext":""}
	        ];
          vm.newRole_DisplayText = 'Buyer';
        }




    vm.switchView = function(){
      session.changeRole();
      sharedService.setData('paramsListTable',undefined);
      $state.transitionTo('root.dashboard.Gridview', $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
    };





}

