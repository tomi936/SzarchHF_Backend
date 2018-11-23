var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Table = db.model('tables', {
    seats: Schema.Types.Number
});

module.exports = Table;