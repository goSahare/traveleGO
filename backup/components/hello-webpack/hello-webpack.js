export default helloWebpack;

function helloWebpack() {
    'ngInject';

    return {
        restrict: 'E',
        scope: {},
        template: require('./hello-webpack.html'),
        // controllerAs: 'vm',
        // controller: function() {
        //     var vm = this;
        //
        //     vm.greeting = 'Hello Webpack.';
        // };
        controller: helloWebpackController
    };

    function helloWebpackController($scope) {

        // var vm = this;

        $scope.greeting = 'Hello Webpack.';
    }
}

