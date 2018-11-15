var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var ReservationModel = requireOption(objectrepository, 'ReservationModel');

    return function (req, res, next) {


        return next();
    };
}

