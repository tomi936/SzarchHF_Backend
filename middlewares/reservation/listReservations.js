var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var ReservationModel = requireOption(objectrepository, 'reservationModel');
    var ReservationDot = requireOption(objectrepository, 'reservationDto');


    return function (req, res, next, isWaiter = false) {
        var whereState = {};

        var today = new Date().setHours(0,0,0,0);
        if (isWaiter)
            whereState = {startTime: {$gte:today}};
        else
            whereState = {$and:[ {clientId: req.user.id} , {startTime: {$gte:today}}]};

        ReservationModel.find(whereState).populate("owner").exec(function (err, result) {
            if (err || !result)
                return error(res,"Can't load reservations",400,err);

            //console.log(result);

            res.tpl.resObj = [];
            if (result.length > 0) {
                result.forEach(function (item) {
                    var Reservation = ReservationDot.constructFromObject(item.toObject());
                    res.tpl.resObj.push(Reservation);
                });
            }
            return next();
        });

    };
};

