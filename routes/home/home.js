export default /*@ngInject*/ homeController;

function homeController($http, $scope, userData, $cities, $state) {
    'ngInject';

    $scope.userData = userData;
    $scope.emailStatus = false;
    $scope.cities = $cities.data.Cities;
    var urlReq = 'http://localhost:5000/';      //sendEmail';
    var message;

    $scope.searchFlights = function () {
        var journeyDate = userData.journeyDate.depart;
        var formattedDate = journeyDate.getFullYear() + '-' + journeyDate.getMonth() + '-' + journeyDate.getDate();
        message = {
            from: userData.location.from.code,
            to: userData.location.to.code,
            journeyDate: formattedDate
        };
        //console.log(message, formattedDate);
        $http.post(urlReq + 'flights', message).then(function (resp) {
            console.log(resp);
        });
    };

    $scope.dateOptions = {
        maxDate: new Date(2020, 5, 22),
        minDate: new Date()
    };

    $scope.departDate1 = function () {
        $scope.deportPopUp1.opened = true;
    };

    $scope.deportPopUp1 = {
        opened: false
    };

    $scope.departDate2 = function () {
        $scope.deportPopUp2.opened = true;
    };

    $scope.deportPopUp2 = {
        opened: false
    };


    $scope.sendMail = function () {
        message = {
            name: userData.firstName + ' ' + userData.lastName,
            email: userData.email,
            phone: userData.phone,
            journeyDate: userData.journeyDate.depart,
            location: userData.location
        };
        $http.post(urlReq + 'sendEmail', message).then(function (resp) {
            if (resp.status == 200){
                $scope.emailStatus = true;
            }
        });
    }
}