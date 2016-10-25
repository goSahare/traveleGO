/* global process:true */

var angularity = require('webpack-angularity-solution');
var opener     = require('opener-for-webpack');

const PORT = 3000,
    GLOBALS = {
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
    };
module.exports = angularity(process.env, {
    globals: GLOBALS, port: PORT
})
    .define('common')
    .append(browserOpener)
    .include(process.env.MODE)
    .otherwise('app')
    .resolve();

function browserOpener(configurator, options) {
    var url = 'http://localhost' + (options.port ? ':' + options.port : '');
    return configurator
        .plugin('opener-for-webpack', opener, [{url: url}]);
}