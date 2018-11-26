var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var TableDto = requireOption(objectrepository, 'tableDto');
    var ReservationModel = requireOption(objectrepository, 'reservationModel');


    return function (req, res, next) {
        if (typeof req.query === "undefined")
            return error(res,"query is empty",400);
        if (typeof req.query.time === "undefined" || typeof req.query.duration === "undefined"
            || typeof req.query.person === "undefined")
            return error(res,"Reservation data is not complete to search",400);
        var duration = parseInt(req.query.duration);
        if(duration<1 || duration>5)
            return error(res,"Invalid value in duration",400);
        var person = parseInt(req.query.person);
        if(person<=0 )
            return error(res,"Invalid value in personNumber",400);

        var startTime = new Date(parseInt(req.query.time));
        var endTime = (new Date(parseInt(req.query.time))).setHours(startTime.getHours() + duration);

        var condition =
            {
                $or: [
                    {$and: [{startTime: {$lte: startTime}}, {endTime: {$gte: startTime}}]},
                    {$and: [{startTime: {$lte: endTime}},   {endTime: {$gte: endTime}}]},
                    {$and: [{startTime: {$gte: startTime}}, {endTime: {$lte: endTime}}]}
                ]
            };
        ReservationModel.find(condition, function (err, result) {
            if (err)
                return error(res,"Error DB during searching reservations",500,err);

            res.tpl.resObj = [];
            res.tpl.tables.forEach(function (item) {
                if(item.seats>=person)
                    res.tpl.resObj.push(TableDto.constructFromObject(item.toObject()));
            });
            if (result != null && result.length > 0) {
                result.forEach(function (item) {
                    var tableIndex = res.tpl.resObj.findIndex(t=>t.tableId == item.tableId);
                    if(tableIndex>-1) {
                        res.tpl.resObj.splice(tableIndex, 1);
                    }
                });
            }
            return next();
        });

    };
};

