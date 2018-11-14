var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {


        return next();
    };
}

