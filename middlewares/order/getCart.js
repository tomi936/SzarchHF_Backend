var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var CardModel = requireOption(objectrepository, 'cardModel');

    return function (req, res, next) {


        return next();
    };
}

