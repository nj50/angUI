angular.module('myAppT')
  .service('session', userAuthentication);
userAuthentication.$inject = ['$q','$http','configration'];

function userAuthentication($q, $http, configration){
  var deferred = null,
        that = this;
    this.role = null;
    this.userObj = {};
    this.switch = false;
    that.loadRole = function(){
        if(deferred == null){
            deferred = $q.defer();
            $http({
                method: "GET",
                url: configration.baseURL+'users/user'
            }).success(function(res) {
              //var res = {"data":[{"type":"surplususer","attributes":{"nickname":"","lastName":"MockLname","email":"mock@mock.com","dsGourps":0,"role":["SURPLUS_ADMIN"],"personId":"1234567","customerId":"1950","firstName":"MockFname"}}]};
                that.userObj = res.data;
                deferred.resolve(res);
            })
            .error(function(err, status) {
                deferred.reject(err)
            });
            return deferred.promise;
        }
        return deferred.promise;
    };
    this.getRole = function(){
      if(that.getUserObj().role.indexOf("SURPLUS_BUYER") > -1){
        return 'buyer';
      }
      if(that.getUserObj().role.indexOf("SURPLUS_ADMIN") > -1){
        return 'manager';
      }
    };
    this.getUserObj = function(){
      return that.userObj[0].attributes;
    };
    this.changeRole = function(){
      that.switch = true;
      if(that.getRole() === 'buyer'){
          that.userObj[0].attributes.role[0] = "SURPLUS_ADMIN";
          return;
      }
      if(that.getRole() === 'manager'){
          that.userObj[0].attributes.role[0] = "SURPLUS_BUYER";
          return;
      }
    };
}