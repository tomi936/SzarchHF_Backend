var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {


        return next();
    };
}

