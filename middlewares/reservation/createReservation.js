var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var ReservationModel = requireOption(objectrepository, 'reservationModel');

    return function (req, res, next) {
        if (typeof res.tpl.reservation === "undefined" || res.tpl.reservation == null) {
            res.tpl.error = "Missing reservation";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        res.tpl.reservation.save(function (err) {
            if (err) {
                res.tpl.error = "Error during saving reservation to DB";
                console.log(res.tpl.error);
                return res.sendStatus(500);
            }
            return next();
        });
    };
};

