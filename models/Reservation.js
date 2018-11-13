var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Reservation = db.model('Reservations', {
    time: Schema.Types.Date,
    duration: Schema.Types.Number,
    personNumber: Schema.Types.String,
    status: Schema.Types.String,
    _clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },_waiterId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    _tableId: {
        type: Schema.Types.ObjectId,
        ref: 'Tables'
    }
});

module.exports = Reservation;