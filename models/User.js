var Schema = require('mongoose').Schema;
var db = require('../config/db');

const Role = { Client : 0, Waiter : 1, Admin:3}

var User = db.model('Users', {
    email: Schema.Types.String,
    name: Schema.Types.String,
    password: Schema.Types.String,
    address: Schema.Types.String,
    role: Schema.Types.Number,
    loyaltyPoints: Schema.Types.Number
});

module.exports = {
    User : User,
    Role: Role

};