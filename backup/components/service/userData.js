export default userData;

function userData() {
    return {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        location: {
            oneWay: {
                from: '',
                to: ''
            },
            roundTrip: {
                from: '',
                to: ''
            }
        },
        journey: {
            depart: '',
            return: ''
        }
    }
}