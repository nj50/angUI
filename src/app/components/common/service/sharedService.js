
angular.module('myAppT')
	.factory('sharedService', sharedserviceFunc);

sharedserviceFunc.$inject = ['$state'];
function sharedserviceFunc($state){
	'use strict';
	var headInfo = [];
	return {
	    setData: function (key, data) {
	        headInfo[key] = data;
	    },
	    getData: function (key) {
	        return headInfo[key];
	    },
	    redirect :function(){
	    	if(this.getData('paramsListTable') !== undefined){
	    		$state.go("root.dashboard.Tableview");
	    	}else{
	    		$state.go("root.dashboard.Gridview");
	    	}
	    }
	};
}