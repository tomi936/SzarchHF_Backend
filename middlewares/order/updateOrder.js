var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'OrderModel');

    return function (req, res, next) {


        return next();
    };
}

