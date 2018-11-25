var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Order = db.model('orders', {
    time: Schema.Types.Date,
    sum: Schema.Types.Number,
    status: Schema.Types.String,
    type: Schema.Types.String,
    rating: Schema.Types.Number,
    discount: Schema.Types.Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    _tableId: {
        type: Schema.Types.ObjectId,
        ref: 'Tables'
    },
    orderItems: [{
        _menuItemId: {
            type: Schema.Types.ObjectId,
            ref: 'Menus'
        },
        amount: Schema.Types.Number
    }]
});

module.exports = Order;