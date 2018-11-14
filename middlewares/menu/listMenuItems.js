var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var MenuItemModel = requireOption(objectrepository, 'MenuItemModel');

    return function (req, res, next) {


        return next();
    };
}

