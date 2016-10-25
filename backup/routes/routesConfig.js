export default routesConfig;

//import homeController from './home/home.js';

function routesConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            template: require('./home/home.html'),
            controller: require('./home/home')
        })
        .state('home.first', {
            url: '/home',
            template: require('../components/partial/first.html')
        })
        .state('home.second', {
            template: require('../components/partial/second.html')
        })
        .state('home.third', {
            template: require('../components/partial/third.html')
        });
}