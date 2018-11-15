var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');

    return function (req, res, next) {


        return next();
    };
}

