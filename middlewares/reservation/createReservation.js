var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var ReservationModel = requireOption(objectrepository, 'reservationModel');

    return function (req, res, next) {
        if (typeof res.tpl.reservation === "undefined" || res.tpl.reservation == null)
            error(res,"Missing reservation",400);

        res.tpl.reservation.save(function (err) {
            if (err)
                error(res,"Error during saving reservation to DB",500,err);
            return next();
        });
    };
};

