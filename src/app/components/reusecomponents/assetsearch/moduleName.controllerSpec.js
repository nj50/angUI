describe("A suite", function() {
	beforeEach(module('SurplusStore'));
	var scope;
	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
	});


		// it('Test Data', inject(function ($controller, $rootScope) { 
		// 	scope = $rootScope.$new();  
		// 	$controller('MainCtrl', {    
		// 		$scope: scope  
		// 	});
		// 	expect($scope.user).toEqual('ABC');
		// }));


	// Tesing controller AS syntax...
	// it('Test Data', inject(function ($controller, $rootScope) { 
	// 	scope = $rootScope.$new(); 
	// 	$controller('MainCtrl as ctrl' , {    
	// 		$scope: scope  
	// 	});

	// 	expect(scope.ctrl.user).toEqual('ABC');
	// }));





});