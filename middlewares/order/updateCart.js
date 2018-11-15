var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var CardModel = requireOption(objectrepository, 'cartModel');

    return function (req, res, next) {


        return next();
    };
}

