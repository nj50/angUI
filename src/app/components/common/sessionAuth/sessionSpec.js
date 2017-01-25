//sessionSpec.js
describe("Session Spec", function () {
  var httpBackend,configration,session;
    beforeEach(module("myAppT"));

    //@@ assetSearchGridViewService Test
	  beforeEach(inject(function( _$httpBackend_, _configration_, _session_) {
	    httpBackend = _$httpBackend_;
	    configration = _configration_;
	    session = _session_;
	  }));

	it('Session should be defined', function () {
      expect(session).toBeDefined();
    });


    it ('should return get data for user Buyer', function() {
        var _data = "";
        httpBackend.when('GET',configration.baseURL+'users/user');
        httpBackend.expectGET(configration.baseURL+'users/user').respond({"data":[{"type":"surplususer","attributes":{"nickname":"","lastName":"MockLname","email":"mock@mock.com","dsGourps":0,"role":["SURPLUS_BUYER"],"personId":"1234567","customerId":"2853","firstName":"MockFname"}}]});
        session.loadRole().then(function(result) {
            _data = result.data[0];
        });
        httpBackend.flush();
        expect(session.userObj).not.toBeNull();
        expect(session.getRole()).toEqual('buyer');
    	expect(session.getRole()).not.toEqual('manager');
        expect(session.changeRole).toBeDefined();
        session.changeRole();
        expect(_data.attributes.role[0]).toEqual('SURPLUS_ADMIN');
    });




    it ('should return get data for user Manager', function() {
        var _data = "";
        httpBackend.when('GET',configration.baseURL+'users/user');
        httpBackend.expectGET(configration.baseURL+'users/user').respond({"data":[{"type":"surplususer","attributes":{"nickname":"","lastName":"MockLname","email":"mock@mock.com","dsGourps":0,"role":["SURPLUS_ADMIN"],"personId":"1234567","customerId":"2853","firstName":"MockFname"}}]});
        session.loadRole().then(function(result) {
            _data = result.data[0];
        })
        httpBackend.flush();
        expect(session.userObj).not.toBeNull();
        expect(session.getRole()).toEqual('manager');
        expect(session.getRole()).not.toEqual('buyer');
        expect(session.changeRole).toBeDefined();
        session.changeRole();
        expect(_data.attributes.role[0]).toEqual('SURPLUS_BUYER');
    });


    var failTest = function(error) {
      expect(error).toBeUndefined();
    };
    it ('session service respond 500 Failure', function() {
        var _data = "";
        httpBackend.when('GET',configration.baseURL+'users/user');
        httpBackend.expectGET(configration.baseURL+'users/user').respond(500);
        session.loadRole().then(function(result) {
            _data = result.data[0];
        }).catch(failTest).finally(failTest);
        httpBackend.flush();
    });


});