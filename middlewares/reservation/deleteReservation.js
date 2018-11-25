var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var UserRole = requireOption(objectrepository, 'Role');

    return function (req, res, next) {
        if (typeof res.tpl.reservation === "undefined" || res.tpl.reservation == null) {
            res.tpl.error = "Missing reservation";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if (req.user.role === UserRole.Client && res.tpl.reservation.clientId !== req.user.id) {
            res.tpl.error = "Can't delete another one's reservation ";
            console.log(res.tpl.error);
            return res.sendStatus(401);
        }

        res.tpl.reservation.remove(function (err) {
            if (err) {
                res.tpl.error = "Error during removing reservation to DB";
                console.log(res.tpl.error);
                return res.sendStatus(500);
            }
            return next();
        });

    };
};

