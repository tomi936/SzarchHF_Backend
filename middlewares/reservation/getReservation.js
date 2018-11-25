var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var ReservationModel = requireOption(objectrepository, 'reservationModel');
    var ReservatioDto = requireOption(objectrepository, 'reservationDto');

    return function (req, res, next) {
        var reservationId = null;
        if (typeof req.body !== "undefined" && Object.keys(req.body).length > 0 && typeof req.body.reservationId !== "undefined")
            reservationId = req.body.reservationId;

        if (typeof req.params !== "undefined" && typeof req.params.reservationId !== "undefined")
            reservationId = req.params.reservationId;


        if (!reservationId) {
            res.tpl.error = "No reservationId";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        ReservationModel.findOne({_id: sanitize(reservationId)}, function (err, result) {
            if (err) {
                res.tpl.error = "DB error during finding reservation";
                console.log(res.tpl.error);
                return res.status(400).json(res.tpl.error);
            }


            res.tpl.reservation = result;
            return next();
        });
    };
};

