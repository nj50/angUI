angular
.module('myAppT')

.constant('configration' ,(function(){
'use strict';
	var resource ='http://localhost:8080';
  //var resource ='http://10.249.74.83:8080'  //'http://localhost:8080';
  return {
    baseURL: resource+'/api/v1/surplusstore/'
  };
})());