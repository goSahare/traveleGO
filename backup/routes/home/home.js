export default /*@ngInject*/ homeController;

function homeController($http, $scope,userData) {
    'ngInject';

    $scope.sendTo = 'your email here';
    //https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat
    //https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json
    var _ = require('lodash');
    $scope.details = {
        airport: [],
        city: [],
        country: [],
        code: []
    };

    $http.get('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(function (resp) {
        var data = resp.data.split(/\n/);
        _.forEach(data, function (val, key) {
            if (key < 10) {
                val = val.replace(/["']/g, "");
                val = val.split(',');
                $scope.details.airport.push(val[1]);
                $scope.details.city.push(val[2]);
                $scope.details.country.push(val[3]);
                $scope.details.code.push(val[4]);
            }
        });
    });

    var url = 'http://192.168.10.83:5000/sendEmail';
    var message = {

    };                  // Required details from form.

   // sendMail();


    function sendMail(){
        $http.get(url, message).then(function(resp){
            console.log(resp)
        })
    }



}
