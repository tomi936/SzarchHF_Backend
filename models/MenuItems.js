var Schema = require('mongoose').Schema;
var db = require('../config/db');


var MenuItems = db.model('MenuItems', {
    name: Schema.Types.String,
    price:Schema.Types.Number
});

module.exports = MenuItems;