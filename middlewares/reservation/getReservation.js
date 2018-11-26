var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var ReservationModel = requireOption(objectrepository, 'reservationModel');
    var ReservatioDto = requireOption(objectrepository, 'reservationDto');

    return function (req, res, next) {
        var reservationId = null;
        if (typeof req.body !== "undefined" && Object.keys(req.body).length > 0 && typeof req.body.reservationId !== "undefined")
            reservationId = req.body.reservationId;

        if (typeof req.params !== "undefined" && typeof req.params.reservationId !== "undefined")
            reservationId = req.params.reservationId;


        if (!reservationId)
            return error(res,"No reservationId",400);

        ReservationModel.findOne({_id: sanitize(reservationId)}, function (err, result) {
            if (err)
                return error(res,"DB error during finding reservation",500,err);

            res.tpl.reservation = result;
            return next();
        });
    };
};

