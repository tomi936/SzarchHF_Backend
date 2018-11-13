var Schema = require('mongoose').Schema;
var db = require('../config/db');


var MenuItems = db.model('MenuItems', {
    seats: Schema.Types.Number
});

module.exports = MenuItems;