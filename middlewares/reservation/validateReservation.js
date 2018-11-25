var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    //var MenuItemModel = requireOption(objectrepository, 'MenuItemModel');
    var ReservationModel = requireOption(objectrepository, 'reservationModel');
    var ReservationStatus = requireOption(objectrepository, 'reservationStatus');

    return function (req, res, next) {
        if (typeof req.body === "undefined" || Object.keys(req.body).length === 0) {
                res.tpl.error = "body is empty";
                console.log(res.tpl.error);
                return res.sendStatus(400);
        }
        if (typeof req.body.time === "undefined" || typeof req.body.duration === "undefined"
            || typeof req.body.personNumber === "undefined"|| typeof req.body.tableId === "undefined") {
            res.tpl.error = "Reservation data is not complete";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if (typeof res.tpl.tables === "undefined" || res.tpl.tables == null || res.tpl.tables.length === 0) {
            res.tpl.error = "Missing tables";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        var duration = parseInt(req.body.duration);
        if(duration<1 || duration>5){
            res.tpl.error = "Invalid value in duration";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        var person = parseInt(req.body.personNumber);
        if(person<=0 ){
            res.tpl.error = "Invalid value in personNumber";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        var table = res.tpl.tables.find(t=>t.id === req.body.tableId);
       /* var table = res.tpl.tables.find(function (item) {
            console.log(item.id + " --- " + req.body.tableId);
            return item.id === req.body.tableId;
        });*/
        if(!table)
        {
            res.tpl.error = "Invalid tableId";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if(person > table.seats)
        {
            res.tpl.error = "Invalid personNumber: more than seats of the table have";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }


        res.tpl.reservation = null;
        var Reservation = new ReservationModel();
        Reservation.clientId = req.user.id;
        Reservation.startTime = new Date(req.body.time);
        Reservation.endTime = (new Date(req.body.time)).setHours(Reservation.startTime.getHours()+duration);
        Reservation.tableId = sanitize(req.body.tableId);
        Reservation.status = ReservationStatus.Pending;
        Reservation.personNumber = person;
        Reservation.waiterId = null;

        
        var condition = {
            $and:[
                {tableId:Reservation.tableId},
                {$or: [
                        {$and : [{startTime : {$lte: Reservation.startTime}}, {endTime:{$gte:Reservation.startTime}}]},
                        {$and : [{startTime : {$lte: Reservation.endTime}}, {endTime:{$gte:Reservation.endTime}}]},
                        {$and : [{startTime : {$gte: Reservation.startTime}}, {endTime:{$lte:Reservation.endTime}}]}
                        ]}]
        };
        ReservationModel.find(condition, function (err,result) {
            if (err) {
                res.tpl.error = "Error DB during searching reservations";
                console.log(res.tpl.error);
                return res.sendStatus(500);
            }

            if(result != null && result.length>0){
                res.tpl.error = "Requested table already reserved";
                console.log(res.tpl.error);
                return res.sendStatus(400);
            }

            res.tpl.reservation = Reservation;
            return next();
        });
        
    };
};

