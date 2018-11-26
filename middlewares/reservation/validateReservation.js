var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    //var MenuItemModel = requireOption(objectrepository, 'MenuItemModel');
    var ReservationModel = requireOption(objectrepository, 'reservationModel');
    var ReservationStatus = requireOption(objectrepository, 'reservationStatus');

    return function (req, res, next) {
        if (typeof req.body === "undefined" || Object.keys(req.body).length === 0)
            return error(res,"body is empty",400);
        if (typeof req.body.time === "undefined" || typeof req.body.duration === "undefined"
            || typeof req.body.personNumber === "undefined"|| typeof req.body.tableId === "undefined")
            return error(res,"Reservation data is not complete",400);
        if (typeof res.tpl.tables === "undefined" || res.tpl.tables == null || res.tpl.tables.length === 0)
            return error(res,"Missing tables",500);

        var duration = parseInt(req.body.duration);
        if(duration<1 || duration>5)
            return error(res,"Invalid value in duration",400);
        var person = parseInt(req.body.personNumber);
        if(person<=0 )
            return error(res,"Invalid value in personNumber",400);
        var table = res.tpl.tables.find(t=>t.id === req.body.tableId);
       /* var table = res.tpl.tables.find(function (item) {
            console.log(item.id + " --- " + req.body.tableId);
            return item.id === req.body.tableId;
        });*/
        if(!table)
            return error(res,"Invalid tableId",400);
        if(person > table.seats)
            return error(res,"Invalid personNumber: more than seats of the table have",400);

        var Reservation = null;

        if(typeof res.tpl.reservation === "undefined" || res.tpl.reservation == null)
        {
            res.tpl.reservation = null;
            Reservation = new ReservationModel();
            Reservation.clientId = req.user.id;
            Reservation.status = ReservationStatus.Pending;
            Reservation.waiterId = null;
        }
        else
            Reservation = res.tpl.reservation;

        Reservation.startTime = new Date(req.body.time);
        Reservation.endTime = (new Date(req.body.time)).setHours(Reservation.startTime.getHours()+duration);
        Reservation.tableId = sanitize(req.body.tableId);
        Reservation.personNumber = person;

        
        var condition = {
            $and:[
                {tableId:Reservation.tableId},
                {_id: {$ne : Reservation._id}},
                {$or: [
                        {$and : [{startTime : {$lte: Reservation.startTime}}, {endTime:{$gte:Reservation.startTime}}]},
                        {$and : [{startTime : {$lte: Reservation.endTime}}, {endTime:{$gte:Reservation.endTime}}]},
                        {$and : [{startTime : {$gte: Reservation.startTime}}, {endTime:{$lte:Reservation.endTime}}]}
                        ]}]
        };
        ReservationModel.find(condition, function (err,result) {
            if (err)
                 return error(res,"Error DB during searching reservations",500,err);

            if(result != null && result.length>0)
                 return error(res,"Requested table already reserved",400);

            res.tpl.reservation = Reservation;
            return next();
        });
        
    };
};

