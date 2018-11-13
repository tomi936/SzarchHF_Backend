var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Cart = db.model('Carts', {
    time: Schema.Types.Date,
    sum: Schema.Types.Number,
    _clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    orderItems: [{
        _menuId: {
            type: Schema.Types.ObjectId,
            ref: 'Menus'
        },
        amount: Schema.Types.Number
    }]
});

module.exports = Cart;