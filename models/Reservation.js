var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Reservation = db.model('reservations', {
    startTime: Schema.Types.Date,
    endTime: Schema.Types.Date,
    personNumber: Schema.Types.String,
    status: Schema.Types.String,
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },waiterId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tableId: {
        type: Schema.Types.ObjectId,
        ref: 'tables'
    }
});

module.exports = Reservation;