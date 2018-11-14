var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var TableModel = requireOption(objectrepository, 'TableModel');

    return function (req, res, next) {


        return next();
    };
}

