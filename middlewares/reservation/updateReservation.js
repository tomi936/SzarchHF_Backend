var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var ReservationModel = requireOption(objectrepository, 'reservationModel');
    var ReservationStatus = requireOption(objectrepository, 'reservationStatus');
    var Role = requireOption(objectrepository, 'Role');

    return function (req, res, next) {
        if (typeof req.body === "undefined" || Object.keys(req.body).length === 0) {
            res.tpl.error = "body is empty";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        if (typeof res.tpl.reservation === "undefined" || res.tpl.reservation == null) {
            res.tpl.error = "Missing reservation";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        var Reservation = res.tpl.reservation;

        if (typeof req.body.status === "undefined" &&
            (req.body.status === ReservationStatus.Pending || req.body.status === ReservationStatus.Accepted ||req.body.status === ReservationStatus.Rejected)) {
            res.tpl.error = "Reservation data is not complete";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        Reservation.status = sanitize(req.body.status);

        if(req.user.role === Role.Waiter)
            Reservation.waiterId = req.user.id;


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

