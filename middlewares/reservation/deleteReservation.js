var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');

module.exports = function (objectrepository) {

    var UserRole = requireOption(objectrepository, 'Role');

    return function (req, res, next) {
        if (typeof res.tpl.reservation === "undefined" || res.tpl.reservation == null)
            return error(res,"Missing reservation",400);
        if (req.user.role === UserRole.Client && res.tpl.reservation.clientId !== req.user.id)
            return error(res,"Can't delete another one's reservation",401);
        res.tpl.reservation.remove(function (err) {
            if (err)
                return error(res,"Error during removing reservation to DB",500,err);
            return next();
        });

    };
};

