var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var TableDto = requireOption(objectrepository, 'tableDto');
    var ReservationModel = requireOption(objectrepository, 'reservationModel');


    return function (req, res, next) {
        if (typeof req.query === "undefined") {
            res.tpl.error = "params is empty";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if (typeof req.query.time === "undefined" || typeof req.query.duration === "undefined"
            || typeof req.query.person === "undefined") {
            res.tpl.error = "Reservation data is not complete to search";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        var duration = parseInt(req.query.duration);
        if(duration<1 || duration>5){
            res.tpl.error = "Invalid value in duration";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        var person = parseInt(req.query.person);
        if(person<=0 ){
            res.tpl.error = "Invalid value in personNumber";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        var startTime = new Date(req.query.time);
        var endTime = (new Date(req.query.time)).setHours(startTime.getHours() + duration);

        var condition =
            {
                $or: [
                    {$and: [{startTime: {$lte: startTime}}, {endTime: {$gte: startTime}}]},
                    {$and: [{startTime: {$lte: endTime}},   {endTime: {$gte: endTime}}]},
                    {$and: [{startTime: {$gte: startTime}}, {endTime: {$lte: endTime}}]}
                ]
            };
        ReservationModel.find(condition, function (err, result) {
            if (err) {
                res.tpl.error = "Error DB during searching reservations";
                console.log(res.tpl.error);
                return res.sendStatus(500);
            }

            res.tpl.resObj = [];
            res.tpl.tables.forEach(function (item) {
                if(item.seats>=person)
                    res.tpl.resObj.push(TableDto.constructFromObject(item.toObject()));
            });
            if (result != null && result.length > 0) {
                result.forEach(function (item) {
                    console.log(JSON.stringify(item));
                    console.log(item.tableId);
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

