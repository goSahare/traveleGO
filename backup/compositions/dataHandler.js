const MODULE_NAME = 'userData';

export default MODULE_NAME;

angular.module(MODULE_NAME, [])
    .factory('userData',
        require('../components/service/userData.js'));

