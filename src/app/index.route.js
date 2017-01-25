(function() {
    'use strict';

    angular
        .module('myAppT')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('root', {
            url: '',
            abstract:true,
            resolve: {
                getUserRole: ['session', function (session) {
                    return session.loadRole();
                }]
            },
            views: {
                "header": {
                    templateUrl: 'app/components/common/header/header.html',
                    controller: 'headerController',
                    controllerAs: 'vm'
                },
                "footer":{
                  templateUrl: 'app/components/common/footer/footer.html'
                },
                'container@': {
                    templateProvider: function ($templateFactory, $stateParams,session) {
                        var role = session.getRole();
                        return $templateFactory.fromUrl('app/components/'+role+'/index.html', $stateParams);
                    }
                }
            }
        })
        .state('root.dashboard', {
            views: {
                    'home@root': {
                        templateUrl: 'app/components/reusecomponents/assetsearch/dashboard.html',
                    }
                }
        })
        .state('root.dashboard.Gridview', {
                url: '/',
                views: {
                    'assetsearchView@root.dashboard': {
                        templateUrl: 'app/components/reusecomponents/assetsearch/assetsearch-gridview/assetsearchGridview.html',
                        controller: 'assetsearchgridviewController',
                        controllerAs: 'vm'
                    }
                }
            })
        .state('root.dashboard.Tableview', {
                url: '/search',
                views: {
                    'assetsearchView@root.dashboard': {
                        templateUrl: 'app/components/reusecomponents/assetsearch/assetsearch-tableview/assetsearchTableview.html',
                        controller: 'assetsearchTableviewController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();