//sharedServiceSpec.js
describe("sharedService Spec", function () {
	  var sharedService,state,rootScope;
    beforeEach(module("myAppT"));


    //@@ sharedServiceSpec Test
	  beforeEach(inject(function(_sharedService_, _$state_, _$rootScope_) {
	    sharedService = _sharedService_;
	    state = _$state_;
	    rootScope = _$rootScope_;
	  }));

	it('sharedService should be defined', function () {
      expect(sharedService).toBeDefined();
    });

    it('should able to setData',function(){
    	sharedService.setData('test','welcome');
    	expect(sharedService.getData('test')).toEqual('welcome');
    });

   

    it('redirection',function(){
    	sharedService.redirect();
    	sharedService.setData('paramsListTable',[]);
    	sharedService.redirect();
    })


});