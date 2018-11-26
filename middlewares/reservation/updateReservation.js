var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var ReservationModel = requireOption(objectrepository, 'reservationModel');
    var ReservationStatus = requireOption(objectrepository, 'reservationStatus');
    var Role = requireOption(objectrepository, 'Role');

    return function (req, res, next) {
        if (typeof req.body === "undefined" || Object.keys(req.body).length === 0)
            error(res,"body is empty",400);

        if (typeof res.tpl.reservation === "undefined" || res.tpl.reservation == null)
            error(res,"Missing reservation",400);

        var Reservation = res.tpl.reservation;

        if (typeof req.body.status === "undefined" &&
            (req.body.status === ReservationStatus.Pending || req.body.status === ReservationStatus.Accepted ||req.body.status === ReservationStatus.Rejected))
            error(res,"Reservation data is not complete",400);

        Reservation.status = sanitize(req.body.status);

        if(req.user.role === Role.Waiter)
            Reservation.waiterId = req.user.id;


        res.tpl.reservation.save(function (err) {
            if (err)
                error(res,"Error during saving reservation to DB",500,err);
            return next();
        });
    };
};

