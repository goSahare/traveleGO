export default routesConfig;

function routesConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            resolve: {
                $cities: function ($http, $q) {
                    var defered = $q.defer();
                    var citiesReq = 'http://localhost:5000/cities';
                    var cities;
                    $http.post(citiesReq).then(function (resp) {
                        defered.resolve(resp);
                    });
                    return defered.promise;
                }
            },
            template: require('./home/home.html'),
            controller: require('./home/home')
        })
        .state('home.first', {
            url: '/home',
            template: require('./partial/first.html')
        })
        .state('home.second', {

            template: require('./partial/second.html')
        })
        .state('home.third', {
            template: require('./partial/third.html')
        });
}
