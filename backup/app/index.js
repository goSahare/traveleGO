import userService from '../compositions/dataHandler.js';

angular.module('y', [
        userService,
        'ui.router',
        'ui.bootstrap',
        'ui.select'
    ])
    .config(require('../routes/routesConfig.js'))
    .constant('appName', 'hello-webpack')
    .constant('appVersion', '0.0.0.2');
