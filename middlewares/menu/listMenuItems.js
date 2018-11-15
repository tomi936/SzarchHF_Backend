var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var MenuItemModel = requireOption(objectrepository, 'menuItemModel');

    return function (req, res, next) {


        return next();
    };
}

