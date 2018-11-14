var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    //var CardModel = requireOption(objectrepository, 'CardModel');

    return function (req, res, next) {


        return next();
    };
}

