var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var UserRole = requireOption(objectrepository, 'Role');

    return function (req, res, next) {
        if(typeof res.tpl.order === "undefined" || res.tpl.order === null)
        {
            res.tpl.error = "Cant find order model";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        /*if (req.user.role === UserRole.Waiter && res.tpl.order.owner !== req.user.id) {
            res.tpl.error = "Can't delete another one's order ";
            console.log(res.tpl.error);
            return res.sendStatus(401);
        }*/
        res.tpl.order.remove(function (err) {
            if (err) {
                res.tpl.error = "Error DB during removing order from DB";
                console.log(res.tpl.error);
                return res.sendStatus(500);
            }

            return next();
        });
    };
};

